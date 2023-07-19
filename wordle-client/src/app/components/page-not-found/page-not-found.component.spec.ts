import { NO_ERRORS_SCHEMA } from "@angular/core";
import { PageNotFoundComponent } from "./page-not-found.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("PageNotFoundComponent", () => {

  let fixture: ComponentFixture<PageNotFoundComponent>;
  let component: PageNotFoundComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [PageNotFoundComponent]
    });

    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
