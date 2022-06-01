import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const users = (() => {
  const loremNames =
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt, libero. Dicta, nostrum. Totam maxime perferendis consectetur eius, distinctio quisquam, excepturi explicabo placeat, et ipsam cum.'
      .replaceAll(',', '')
      .replaceAll('.', '')
      .split(' ');
  const roles = ['User', 'Admin', 'Manager', 'Owner'];
  const emails = ['gmail', 'outlook', 'company.name', 'zoho', 'terra'];
  const random = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min)) + min;
  const getRandomDate = () => {
    const monthsAndDays = [
      ['Jan.', '31'],
      ['Feb.', '28'],
      ['Mar.', '31'],
      ['Apr.', '30'],
      ['May', '31'],
      ['Jun.', '30'],
      ['Jul.', '31'],
      ['Aug.', '31'],
      ['Sep.', '30'],
      ['Oct.', '31'],
      ['Nov.', '30'],
      ['Dec.', '31'],
    ];
    const i = random(0, monthsAndDays.length);
    const [month, day] = monthsAndDays[i];
    const year = random(0, 8) + 2013;
    return `${month} ${day}, ${year}`;
  };

  const _users = [];
  for (let i = 0; i < 15; i++) {
    const name = loremNames[random(0, loremNames.length)];
    _users.push({
      id: i,
      name,
      role: roles[random(0, roles.length)],
      photo: 'https://picsum.photos/200',
      email: `${name}@${emails[random(0, emails.length)]}.com`,
      lastActive: getRandomDate(),
    });
  }
  return _users;
})();

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass'],
})
export class UsersComponent implements OnInit {
  users$ = new BehaviorSubject(users);
  selectedUser$ = new BehaviorSubject<any>(null);
  constructor() {}

  ngOnInit(): void {}
}
