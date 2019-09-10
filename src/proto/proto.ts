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
        route: 'nematodes',       
        name: 'nematodes',       
        moduleId: PLATFORM.moduleName('./nematodes/nematodes'),
        nav: true, 
        title: 'Nematodes'
      },
      { 
        route: 'fila-proto',            
        name: 'fila-proto',      
        moduleId: PLATFORM.moduleName('./fila-proto/fila-proto'), 
        nav: true, 
        title: 'Filamentous and Protozoa Data' 
      },
      { 
        route: 'settings',            
        name: 'settings',      
        moduleId: PLATFORM.moduleName('./settings/settings'), 
        nav: true, 
        title: 'Settings'
      }
    ]);
  }
}