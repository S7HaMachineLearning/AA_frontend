import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AutomationListComponent } from './automation-list.component';
import { HttpClientModule } from '@angular/common/http';

describe('AutomationListComponent', () => {
  let component: AutomationListComponent;
  let fixture: ComponentFixture<AutomationListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        HttpClientModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AutomationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', async () => {
    const fixture = TestBed.createComponent(AutomationListComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const title = app.querySelectorAll('ion-title');
    expect(title.length).toEqual(1);
    expect(title[0].textContent).toContain('Automation\'s');
  });

  it('ion-content should have empty ion-list', async () => {
    const fixture = TestBed.createComponent(AutomationListComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const ionItem = app.querySelectorAll('ion-item');
    expect(ionItem.length).toEqual(1);
    expect(ionItem[0].textContent).toContain('No automation\'s generated');
  });
});
