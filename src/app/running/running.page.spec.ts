import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RunningPage } from './running.page';

describe('RunningPage', () => {
  let component: RunningPage;
  let fixture: ComponentFixture<RunningPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunningPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RunningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
