import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BackPage } from './back.page';

describe('BackPage', () => {
  let component: BackPage;
  let fixture: ComponentFixture<BackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
