# vue-lightgalleryjs

this is a vue version of [lightgalleryjs](https://github.com/sachinchoolur/lightgallery.js) 

--------------------------------------------------


## Install

#### Yarn

``` bash
yarn add https://github.com/ttys3/vue-lightgalleryjs.git
```
## Development Setup

``` bash
# install dependencies
yarn install

# build dist files
yarn run build
```

## Usage

### VueJS single file (ECMAScript 2015)
```html
<template>
  <div>
    <gallery :images="images" :index="index" @onCloseAfter="onGalleryClosed"></gallery>
  </div>
</template>

<script>
  import VueGallery from 'vue-lightgalleryjs'
  
  export default {
    data: function () {
      return {
        images: [
          {subHtml:'pic1', src: 'https://dummyimage.com/800/ffffff/000000', thumb: 'https://dummyimage.com/128/ffffff/000000'},
          {subHtml:'pic2', src: 'https://dummyimage.com/1600/ffffff/000000', thumb: 'https://dummyimage.com/128/ffffff/000000'},
          {subHtml:'pic3', src: 'https://dummyimage.com/1280/000000/ffffff', thumb: 'https://dummyimage.com/128/000000/ffffff'},
          {subHtml:'pic4', src: 'https://dummyimage.com/400/000000/ffffff', thumb: 'https://dummyimage.com/128/000000/ffffff'},
        ],
        index: 2
      };
    },

    components: {
      'gallery': VueGallery
    },
    methods: {
      onGalleryClosed() {
        // eslint-disable-next-line no-console
        console.log('onGalleryClosed() triggerd.')
        //do other cleanup work
      }
    }
  }
</script> 

<style scoped>
  .image {
    float: left;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    border: 1px solid #ebebeb;
    margin: 5px;
  }
</style>

```
