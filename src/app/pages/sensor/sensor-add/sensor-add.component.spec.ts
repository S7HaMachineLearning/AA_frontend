import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SensorAddComponent } from './sensor-add.component';
import { HttpClientModule } from '@angular/common/http';

describe('SensorAddComponent', () => {
  let component: SensorAddComponent;
  let fixture: ComponentFixture<SensorAddComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SensorAddComponent],
      imports: [
        IonicModule.forRoot(),
        HttpClientModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SensorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', async () => {
    const fixture = TestBed.createComponent(SensorAddComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const title = app.querySelectorAll('ion-title');
    expect(title.length).toEqual(1);
    expect(title[0].textContent).toContain('Add sensors');
  });

  it('ion-content should have a H1', async () => {
    const fixture = TestBed.createComponent(SensorAddComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const ionContent = app.querySelectorAll('ion-content');
    const h1 = ionContent[0].querySelectorAll('h1');
    expect(h1.length).toEqual(1);
    expect(h1[0].textContent).toContain('Configured sensors');
  });

  it('ion-content should have empty ion-list', async () => {
    const fixture = TestBed.createComponent(SensorAddComponent);
    fixture.detectChanges();
    const app = fixture.nativeElement;
    const ionItem = app.querySelectorAll('ion-item');
    expect(ionItem.length).toEqual(1);
    expect(ionItem[0].textContent).toContain('No sensor found');
  });

});
