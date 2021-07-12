# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy

from scrapy_djangoitem import DjangoItem

# import sys, os
# sys.path.append(os.path.abspath('../../scrapypost'))
# import ScrapyPost

from scrapypost.models import ScrapyPost

class ScrapyAppItem(DjangoItem):
    django_model = ScrapyPost



    # name = scrapy.Field()
    # location = scrapy.Field()
    # host = scrapy.Field()
    # rooms = scrapy.Field()
    # amenities = scrapy.Field()
    # price = scrapy.Field()
    # url = scrapy.Field()
    # price = scrapy.Field()
    # avg_rating = scrapy.Field()
    # reviews_count = scrapy.Field()
