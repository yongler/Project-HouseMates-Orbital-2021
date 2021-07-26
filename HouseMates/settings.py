"""
Django settings for HouseMates project.

Generated by 'django-admin startproject' using Django 3.2.3.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from pathlib import Path
import os
from datetime import timedelta

import django_heroku
import dotenv
import dj_database_url

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

dotenv_file = os.path.join(BASE_DIR, ".env")
if os.path.isfile(dotenv_file):
    dotenv.load_dotenv(dotenv_file)


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-!pj4x%qojxw8-cf0hb**-9cyz8u+*9xlsu2xa)m*117n+oe&cc"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
# DEBUG = False

ASGI_APPLICATION = "HouseMates.routing.application"

# CHANNEL_LAYERS = {
#     "default": {
#         "BACKEND": "channels_redis.core.RedisChannelLayer",
#         "CONFIG": {
#             "hosts":[os.environ.get('REDIS_URL', 'redis://localhost:6379')],
#         }
#     },
# }

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer"
    },
}
        # "BACKEND": "channels_redis.core.RedisChannelLayer",
        # "CONFIG": {
        #     "hosts": ["redis://:p57229162f7164187a209a78725b4b3ca0be7c7a8c9ebb537ea628b344970ff73@ec2-34-224-129-112.compute-1.amazonaws.com:12729"],
        # },

ALLOWED_HOSTS = ['*']


# Application definition
INSTALLED_APPS = [
    "corsheaders",
    'whitenoise.runserver_nostatic',
    "django.contrib.admin",
    "django.contrib.auth",
    "rest_framework.authtoken",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "djoser",
    "form.apps.FormConfig",
    "accounts.apps.AccountsConfig",
    
    "main",
    "scrapypost",
    "chat",
    "channels", 

    "social_django",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'social_django.middleware.SocialAuthExceptionMiddleware',
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
# STATICFILES_STORAGE = 'HouseMates.storage.WhiteNoiseStaticFilesStorage'

CORS_ORIGIN_ALLOW_ALL = True

ROOT_URLCONF = "HouseMates.urls"

AUTH_USER_MODEL = "accounts.CustomUser"



 
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            os.path.join(BASE_DIR, "build")
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect'
            ],
        },
    },
]

WSGI_APPLICATION = "HouseMates.wsgi.application"

DATABASES = {}
DATABASES['default'] = dj_database_url.config(conn_max_age=600)

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_HOST_USER = "housematesorbital@gmail.com"
EMAIL_HOST_PASSWORD = "xjhtjgflbapooidy"
EMAIL_USE_TLS = True

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

AUTHENTICATION_BACKENDS = (
    'social_core.backends.google.GoogleOAuth2',
    'django.contrib.auth.backends.ModelBackend'
)
    # 'social_core.backends.facebook.FacebookOAuth2',

# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "Asia/Singapore"

USE_I18N = True

USE_L10N = True

USE_TZ = False


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'build/static')
]

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

MEDIA_URL = '/images/'

MEDIA_ROOT = os.path.join(BASE_DIR, "src", "static")

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticatedOrReadOnly",
    ),
    "DEFAULT_AUTHENTICATION_CLASSES": (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        # 'rest_framework.authentication.BasicAuthentication',
    ),
    'PAGE_SIZE': 2,
    'DATETIME_FORMAT': "%d/%m/%Y %I:%M%p"
    
}

SIMPLE_JWT = {
    "AUTH_HEADER_TYPES": ("JWT",),
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'AUTH_TOKEN_CLASSES': (
        'rest_framework_simplejwt.tokens.AccessToken',
    ),
    "UPDATE_LAST_LOGIN": True
}

SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = '677098566735-j2bkpa87srurhercjmsdl1fu5i2l98t6.apps.googleusercontent.com'
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = '7blLgRZx6wCjhDo85SPkkMwi'
SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE = ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile', 'openid']
SOCIAL_AUTH_GOOGLE_OAUTH2_EXTRA_DATA = ['first_name', 'last_name']



DJOSER = {
    "LOGIN_FIELD": "email",
    "USER_CREATE_PASSWORD_RETYPE": True,
    "USERNAME_CHANGED_EMAIL_CONFIRMATION": True,
    "PASSWORD_CHANGED_EMAIL_CONFIRMATION": True,
    "SET_USERNAME_RETYPE": True,
    "SET_PASSWORD_RETYPE": True,
    "PASSWORD_RESET_CONFIRM_URL": "password/reset/confirm/{uid}/{token}",
    "USERNAME_RESET_CONFIRM_URL": " /reset/confirm/{uid}/{token}",
    "ACTIVATION_URL": "activate/{uid}/{token}",
    # "SEND_CONFIRMATION_EMAIL": True,
    # "SEND_ACTIVATION_EMAIL": True,
    "PASSWORD_RESET_SHOW_EMAIL_NOT_FOUND": True,
    'SOCIAL_AUTH_TOKEN_STRATEGY': 'djoser.social.token.jwt.TokenStrategy',
    'SOCIAL_AUTH_ALLOWED_REDIRECT_URIS': ['http://localhost:8000/google', 'http://localhost:8000/facebook'],
    "SERIALIZERS": {
        "user_create": "accounts.serializers.userProfileSerializer",
        "user": "accounts.serializers.userProfileSerializer",
        "current_user": "accounts.serializers.userProfileSerializer",
        "user_delete": "djoser.serializers.UserDeleteSerializer",
    },
}

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

CORS_ALLOW_CREDENTIALS = True 

django_heroku.settings(locals())
options = DATABASES['default'].get('OPTIONS', {})
options.pop('sslmode', None)

