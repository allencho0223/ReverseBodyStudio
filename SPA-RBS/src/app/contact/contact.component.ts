import { Component, OnInit } from '@angular/core';

import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import {Icon, Style} from 'ol/style';
import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;
  reverseBody;

  ngOnInit() {

    this.reverseBody = new Feature({
      type: 'click',
      geometry: new Point(fromLonLat([126.66391231280636, 37.38751772885954]))
    });

    this.reverseBody.setStyle(new Style({
      image: new Icon(({
        color: '#8959A8',
        crossOrigin: 'anonymous',
        src: '../../assets/img/logo/logo_transparent.png',
        imgSize: [20, 20]
      }))
    }));

    this.source = new OlXYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png',
      features: [this.reverseBody]
    });


    this.layer = new OlTileLayer({
      source: this.source,
      renderBuffer: 200
    });

    this.view = new OlView({
      center: fromLonLat([126.66391231280636, 37.38751772885954]),
      zoom: 17
    });

    this.map = new OlMap({
      target: 'map',
      layers: [this.layer],
      view: this.view
    });
  }
}
