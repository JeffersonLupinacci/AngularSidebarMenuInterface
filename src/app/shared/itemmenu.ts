export class UserItemMenu {
  group: string;
  expanded: Boolean;
  icon: string;
  items: UserSubItemMenu[];
  constructor(group: string, expanded: Boolean, icon: string, items: UserSubItemMenu[]) {
    this.group = group;
    this.expanded = expanded;
    this.icon = icon;
    this.items = items;
  }
}
export class UserSubItemMenu {
  name: string;
  icon: string;
  constructor(name: string, icon: string) {
    this.name = name;
    this.icon = icon;
  }
}
