import json
import os
from typing import Dict, Any, List
import urllib.request
import urllib.error

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Обработка запросов к YandexGPT API для чата.
    Принимает массив сообщений и возвращает ответ от YandexGPT.
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    api_key = os.environ.get('YANDEX_API_KEY')
    folder_id = os.environ.get('YANDEX_FOLDER_ID')
    
    if not api_key or not folder_id:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'error': 'Yandex API credentials not configured'}),
            'isBase64Encoded': False
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        messages: List[Dict[str, str]] = body_data.get('messages', [])
        
        if not messages:
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                'body': json.dumps({'error': 'Messages array is required'}),
                'isBase64Encoded': False
            }
        
        yandex_messages = []
        for msg in messages:
            yandex_messages.append({
                'role': msg['role'],
                'text': msg['content']
            })
        
        yandex_request = {
            'modelUri': f'gpt://{folder_id}/yandexgpt-lite',
            'completionOptions': {
                'stream': False,
                'temperature': 0.6,
                'maxTokens': 2000
            },
            'messages': yandex_messages
        }
        
        req = urllib.request.Request(
            'https://llm.api.cloud.yandex.net/foundationModels/v1/completion',
            data=json.dumps(yandex_request).encode('utf-8'),
            headers={
                'Authorization': f'Api-Key {api_key}',
                'Content-Type': 'application/json',
                'x-folder-id': folder_id
            },
            method='POST'
        )
        
        with urllib.request.urlopen(req, timeout=60) as response:
            response_data = json.loads(response.read().decode('utf-8'))
            
            result = response_data.get('result', {})
            alternatives = result.get('alternatives', [])
            
            if not alternatives:
                raise ValueError('No response from YandexGPT')
            
            assistant_message = alternatives[0]['message']['text']
            
            return {
                'statusCode': 200,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                'body': json.dumps({
                    'message': assistant_message,
                    'model': 'yandexgpt-lite',
                    'usage': result.get('usage', {})
                }),
                'isBase64Encoded': False
            }
    
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        try:
            error_data = json.loads(error_body)
            error_message = error_data.get('message', 'Yandex API error')
        except:
            error_message = f'HTTP {e.code}: {error_body[:200]}'
        
        return {
            'statusCode': e.code,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({
                'error': error_message,
                'type': 'api_error'
            }),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'error': f'Internal error: {str(e)}'}),
            'isBase64Encoded': False
        }