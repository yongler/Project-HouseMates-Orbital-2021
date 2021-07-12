# -*- coding: utf-8 -*-
import scrapy
import collections
import json
from ..items import ScrapyAppItem

class ConvertSpider(scrapy.Spider):
    name = 'convert'
    start_urls = ['http://www.airbnb.com/']

    def parse(self, response): 
        with open('ez3.json', 'r') as file:
            data = json.load(file)
        
            for home in data:
                item = ScrapyAppItem()  
                item['name'] = home.get('listing').get('name')
                item['url'] = Bstr(home.get('listing').get('id'))
                item['price'] = home.get('pricing_quote').get('weekly_price_factor')
                item['avg_rating'] = home.get('listing').get('avg_rating')
                item['reviews_count'] = home.get('listing').get('reviews_count')

                yield item

