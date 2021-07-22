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
      image: ''
    },
    {
      name: 'CSS3',
      image: ''
    },
    {
      name: 'Javascript',
      image: ''
    },
    {
      name: 'NodeJS',
      image: ''
    },
    {
      name: 'Angular',
      image: ''
    },
    {
      name: 'ReactJS',
      image: ''
    },
    {
      name: 'VueJS',
      image: ''
    },
    {
      name: 'Typescript',
      image: ''
    },
    {
      name: 'Python',
      image: ''
    },
    {
      name: 'Java',
      image: ''
    },
    {
      name: 'C#',
      image: ''
    },
    {
      name: 'C',
      image: ''
    },
    {
      name: 'C++',
      image: ''
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
