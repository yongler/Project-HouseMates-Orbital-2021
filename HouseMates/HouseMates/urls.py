from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    # path("", TemplateView.as_view(template_name="index.html")),
    path("admin/", admin.site.urls),
    path("form/", include("form.urls")),
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.jwt")),
    # path('auth/', include('djoser.social.urls')),
    # url(r'^graphql', csrf_exempt(TemplateView.as_view(graphiql=True))),
]

urlpatterns += [re_path(r"^.*", TemplateView.as_view(template_name="index.html"))]
