import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePrincipal } from './delete-principal';

describe('DeletePrincipalComponent', () => {
  let component: DeletePrincipal;
  let fixture: ComponentFixture<DeletePrincipal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletePrincipal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletePrincipal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
