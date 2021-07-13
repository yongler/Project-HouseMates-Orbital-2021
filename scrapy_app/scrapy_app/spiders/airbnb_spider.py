import scrapy


class AirbnbSpider(scrapy.Spider):
    name = 'airbnb'
    # allowed_domains = ['airbnb.com']
    start_urls = ['http://airbnb.com/']

    def parse(self, response):
        response
