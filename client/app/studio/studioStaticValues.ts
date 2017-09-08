'use strict';

let studioStaticValues = {
  templates: {
    creative: {
      label: "Creative",
      image: "https://startbootstrap.com/img/templates/creative.jpg",
    },
    default: {
      label: "Default Template",
      image: "http://cdn1.editmysite.com/merchandised-screenshots/57dc579d4453f.jpg",
    }
  },

  sections: [
    {name: "about-us", label: "About Us", data: {}},
    {name: "slide-show", label: "Slide Show", data: []},
    {name: "product-catalog", label: "Advance Product Catalog", data: {}},
    {name: "product-service", label: "Products & Services", data: []},
    {name: "contact-us", label: "Contact Us", data: {}},
    {name: "location", label: "Location", data: {}},
    {name: "subscription", label: "Subscription", data: {}},
    {name: "news-announcement", label: "News and Announcement", data: {}},
    {name: "gallery", label: "Gallery", data: {}},
    {name: "social-media", label: "Social Media", data: {}}
  ],

  colors: ["#273746", "#CB4335", "#800000", "#F7DC6F", "#58D68D", "#D35400", "#2E86C1"  ],

  types: ["Personal", "Local Service", "Non profit Organization" ],
  categories: ["Food & Drink", "Home & Living", "Auto Car Service", "Local Service" ]
};

exports = module.exports = studioStaticValues;
