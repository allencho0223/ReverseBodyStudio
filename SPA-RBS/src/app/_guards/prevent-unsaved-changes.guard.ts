import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<ProfileComponent> {
    canDeactivate(component: ProfileComponent) {
        if (component.editForm.dirty) {
            return confirm('이 페이지를 벗어나시겠습니까? 저장되지 않은 정보는 사라집니다.');
        }
        return true;
    }
}
