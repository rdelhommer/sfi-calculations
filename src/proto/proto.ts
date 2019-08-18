import './proto.scss'
import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';


export class Proto {
  router: Router

  configureRouter(config, router) {
    this.router = router;

    config.title = 'Aurelia';

    config.map([
      { 
        route: ['', 'home'],       
        name: 'home',       
        moduleId: PLATFORM.moduleName('./home/home'),
        nav: true, 
        title: 'Home'
      }, 
      { 
        route: 'fila-proto',            
        name: 'fila-proto',      
        moduleId: PLATFORM.moduleName('./fila-proto/fila-proto'), 
        nav: true, 
        title: 'Filamentous and Protozoa Data' 
      }
    ]);
  }
}