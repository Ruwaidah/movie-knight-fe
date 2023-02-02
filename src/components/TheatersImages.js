import Amc from './images/theaterimg/amc.png'
import NoImage from './images/theaterimg/no-img.svg'
import Regal from './images/theaterimg/regal.jpg'
import Showplace from './images/theaterimg/showplace.jpg'


const theaterImg = [
    {
      theaterName: /amc/i,
      img: Amc
    },
    {
      theaterName: /regal/i,
      img: Regal
    },
    {
      theaterName: /showplace/i,
      img: `https://www.visitevansville.com/sites/default/files/styles/primary_image_alt/public/content/attraction/1450728101542601714326273058856050000630893n_1.jpg?itok=ksazJAH5`
    },
    {
      theaterName: /Snowden Square/i,
      img: Regal
    },
    {
      theaterName: /cinemark/i,
      img: 'https://www.pikpng.com/pngl/m/430-4307117_cinemark-movie-theater-logo-clipart.png'
    },
    {
      theaterName: '',
      img: NoImage
    }
  ]


export function displayImage(input){
    for(const test of theaterImg){
        if(input.match(test.theaterName)){
            return test.img
        }else{
          console.log('nope')
        }
    }
}
