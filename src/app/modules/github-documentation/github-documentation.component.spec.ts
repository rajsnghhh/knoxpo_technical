import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubDocumentationComponent } from './github-documentation.component';

describe('GithubDocumentationComponent', () => {
  let component: GithubDocumentationComponent;
  let fixture: ComponentFixture<GithubDocumentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GithubDocumentationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GithubDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
