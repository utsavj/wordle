import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HomePageComponent } from "./home-page.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("HomePageComponent", () => {

  let fixture: ComponentFixture<HomePageComponent>;
  let component: HomePageComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [HomePageComponent]
    });

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
