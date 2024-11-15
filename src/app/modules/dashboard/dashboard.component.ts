import { Component } from '@angular/core';

interface Product {
  name: string;
  category: string;
  price: number;
  status: string;
}

interface TopProduct {
  name: string;
  price: number;
  image: string;
  rating: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  revenueData: any;
  categoryData: any;
  chartOptions: any;
  sales: Product[];
  topProducts: TopProduct[];

  ngOnInit() {
    this.revenueData = {
      labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      datasets: [
        {
          label: 'Revenue',
          backgroundColor: '#42A5F5',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'Profit',
          backgroundColor: '#9CCC65',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };

    this.categoryData = {
      labels: ['Electronics', 'Fashion', 'Household'],
      datasets: [
        {
          data: [300, 200, 100],
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
          hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D']
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    this.sales = [
      { name: 'Bamboo Watch', category: 'Accessories', price: 65, status: 'INSTOCK' },
      { name: 'Black Watch', category: 'Accessories', price: 72, status: 'INSTOCK' },
      { name: 'Blue Band', category: 'Fitness', price: 79, status: 'LOWSTOCK' },
      { name: 'Blue T-Shirt', category: 'Clothing', price: 29, status: 'INSTOCK' },
      { name: 'Bracelet', category: 'Accessories', price: 15, status: 'INSTOCK' }
    ];

    this.topProducts = [
      { name: 'Bamboo Watch', price: 65, image: 'https://apollo.primeng.org/assets/demo/images/product/blue-t-shirt.jpg', rating: 5 },
      { name: 'Black Watch', price: 72, image: 'https://apollo.primeng.org/assets/demo/images/product/blue-t-shirt.jpg', rating: 4 },
      { name: 'Blue Band', price: 79, image: 'https://apollo.primeng.org/assets/demo/images/product/blue-t-shirt.jpg', rating: 3 },
      { name: 'Blue T-Shirt', price: 29, image: 'https://apollo.primeng.org/assets/demo/images/product/blue-t-shirt.jpg', rating: 5 },
      { name: 'Bracelet', price: 15, image: 'https://apollo.primeng.org/assets/demo/images/product/blue-t-shirt.jpg', rating: 4 },
      { name: 'Brown Purse', price: 120, image: 'https://apollo.primeng.org/assets/demo/images/product/blue-t-shirt.jpg', rating: 5 }
    ];
  }
}
