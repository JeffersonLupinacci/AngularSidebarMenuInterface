import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtersidebar',
  pure: false
})


export class SidebarFilterPipe implements PipeTransform {
  transform(items: any[], term: string): any {
    const filteredItems: any[] = new Array();
    if (term === '') {
      return items;
    } else {
      items.forEach(function (grp) {
        grp.items.forEach((grpItem) => {
          if (grpItem.name.toLowerCase().includes(term.toLowerCase())) {
            const idx = filteredItems.findIndex(c => c.group === grp.group);
            if (idx < 0) {
              const nGrp = {
                'group': grp.group,
                'icon': grp.icon,
                'expanded': grp.expanded,
                items: [grpItem]
              };
              filteredItems.push(nGrp);
            } else {
              filteredItems[idx].items.push(grpItem);
            }
          }
        });
      });
      return filteredItems;
    }
  }
}
