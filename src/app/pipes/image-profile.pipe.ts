import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageProfile'
})
export class ImageProfilePipe implements PipeTransform {

  transform(value: any, profileIndex = 0): any {
    if (value) {
      const options = ['profiles', 'files'];
      return `https://medjoin20200725162501.azurewebsites.net/resources/${options[profileIndex]}/${value}`;
    }
    return 'assets/images/no_image_profile.png';
  }

}
