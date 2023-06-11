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
});
