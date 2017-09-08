'use strict';
const angular = require('angular');
import toolboxSlider from './slider/slider.component';
import toolboxTestimonial from './testimonial/testimonial.component';
import toolboxLocation from './location/location.component';
import toolboxContactUs from './contactUs/contactUs.component';
import toolboxAboutUs from './aboutUs/aboutUs.component';
import toolboxAdvanceProductCatalog from './advanceProductCatalog/advanceProductCatalog.component';
import toolboxProductService from './productService/productService.component';
import toolboxSubscription from './subscription/subscription.component';
import toolboxNewsAnnouncement from './newsAnnouncement/newsAnnouncement.component';
import toolboxGallery from './gallery/gallery.component';
import toolboxSocialMedia from './socialMedia/socialMedia.component';

export default angular.module('mustudioApp.toolbox', [
    toolboxSlider,
    toolboxTestimonial,
    toolboxLocation,
    toolboxContactUs,
    toolboxAboutUs,
    toolboxAdvanceProductCatalog,
    toolboxProductService,
    toolboxSubscription,
    toolboxNewsAnnouncement,
    toolboxGallery,
    toolboxSocialMedia
])
  .name;
