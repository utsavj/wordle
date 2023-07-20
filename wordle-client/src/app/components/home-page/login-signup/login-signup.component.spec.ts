import { NO_ERRORS_SCHEMA } from "@angular/core";
import { LoginSignupComponent } from "./login-signup.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("LoginSignupComponent", () => {

  let fixture: ComponentFixture<LoginSignupComponent>;
  let component: LoginSignupComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [LoginSignupComponent]
    });

    fixture = TestBed.createComponent(LoginSignupComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
