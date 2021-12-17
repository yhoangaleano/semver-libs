import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericLibraryComponent } from './generic-library.component';

describe('GenericLibraryComponent', () => {
  let component: GenericLibraryComponent;
  let fixture: ComponentFixture<GenericLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericLibraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
