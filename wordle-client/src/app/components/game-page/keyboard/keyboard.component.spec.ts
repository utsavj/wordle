import { NO_ERRORS_SCHEMA } from "@angular/core";
import { KeyboardComponent } from "./keyboard.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("KeyboardComponent", () => {

  let fixture: ComponentFixture<KeyboardComponent>;
  let component: KeyboardComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [KeyboardComponent]
    });

    fixture = TestBed.createComponent(KeyboardComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
