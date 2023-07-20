import { NO_ERRORS_SCHEMA } from "@angular/core";
import { LogoutComponent } from "./logout.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("LogoutComponent", () => {

  let fixture: ComponentFixture<LogoutComponent>;
  let component: LogoutComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [LogoutComponent]
    });

    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
