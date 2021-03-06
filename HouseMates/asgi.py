# import os

# from channels.auth import AuthMiddlewareStack
# from channels.routing import ProtocolTypeRouter, URLRouter
# from django.conf.urls import url
# from django.core.asgi import get_asgi_application

# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "HouseMates.settings")
# # Initialize Django ASGI application early to ensure the AppRegistry
# # is populated before importing code that may import ORM models.    
# django_asgi_app = get_asgi_application()

# from chat.consumers import ChatConsumer

# application = ProtocolTypeRouter({
#     # Django's ASGI application to handle traditional HTTP requests
#     "http": django_asgi_app,

#     # WebSocket chat handler
#     "websocket": AuthMiddlewareStack(
#         URLRouter([
#             # url(r"^chat/admin/$", AdminChatConsumer.as_asgi()),
#             url(r"^chat/$", ChatConsumer.as_asgi()),
#         ])
#     ),
# })

import os
import django
from channels.routing import get_default_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'HouseMates.settings')
django.setup()
application = get_default_application()