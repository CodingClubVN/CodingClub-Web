import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public category: any = [
    {
      name: 'HTML5',
      image: 'http://res.cloudinary.com/hieuduy175111/image/upload/v1626936060/CodingClub/html_xqnr53.png'
    },
    {
      name: 'CSS3',
      image: 'http://res.cloudinary.com/hieuduy175111/image/upload/v1626936060/CodingClub/css-3_rugweo.png'
    },
    {
      name: 'Javascript',
      image: 'http://res.cloudinary.com/hieuduy175111/image/upload/v1626936061/CodingClub/javascript_bombvn.png'
    },
    {
      name: 'NodeJS',
      image: 'http://res.cloudinary.com/hieuduy175111/image/upload/v1626936061/CodingClub/nodejs_edmbuv.png'
    },
    {
      name: 'Angular',
      image: 'http://res.cloudinary.com/hieuduy175111/image/upload/v1626936041/CodingClub/angular.png.png'
    },
    {
      name: 'ReactJS',
      image: 'http://res.cloudinary.com/hieuduy175111/image/upload/v1626936061/CodingClub/react_hoys9w.png'
    },
    {
      name: 'VueJS',
      image: 'http://res.cloudinary.com/hieuduy175111/image/upload/v1626936062/CodingClub/vue_v1hexm.png'
    },
    {
      name: 'Typescript',
      image: 'http://res.cloudinary.com/hieuduy175111/image/upload/v1626936061/CodingClub/typescript_fcwcgl.png'
    },
    {
      name: 'Python',
      image: 'http://res.cloudinary.com/hieuduy175111/image/upload/v1626936061/CodingClub/python_rz76c1.png'
    },
    {
      name: 'Java',
      image: 'http://res.cloudinary.com/hieuduy175111/image/upload/v1626936061/CodingClub/java_kkr9n5.png'
    },
    {
      name: 'C#',
      image: 'http://res.cloudinary.com/hieuduy175111/image/upload/v1626936060/CodingClub/c-sharp_eu1x4r.svg  '
    },
    {
      name: 'C',
      image: 'http://res.cloudinary.com/hieuduy175111/image/upload/v1626936060/CodingClub/c_i5uiue.png'
    },
    {
      name: 'C++',
      image: 'http://res.cloudinary.com/hieuduy175111/image/upload/v1626936060/CodingClub/c_1_djs5je.png'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }
}
