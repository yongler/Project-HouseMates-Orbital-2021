from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.storage import staticfiles_storage
from django.views.generic.base import RedirectView

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="HouseMates API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="housematesorbital@gmail.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("form/", include("form.urls")),
    path("chat/", include("chat.urls")),
    path("accounts/", include("accounts.urls")),

    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.jwt")),
    path('auth/', include('djoser.social.urls')),
    
    path("swagger.json/", schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path("swagger/", schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path("redoc/", schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    # path("favicon.ico", RedirectView.as_view(url=staticfiles_storage.url("favicon.ico")))
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += [re_path(r"^.*", TemplateView.as_view(template_name="index.html"))]
