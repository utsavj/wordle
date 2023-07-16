import { NO_ERRORS_SCHEMA } from "@angular/core";
import { GamePageComponent } from "./game-page.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("GamePageComponent", () => {

  let fixture: ComponentFixture<GamePageComponent>;
  let component: GamePageComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [GamePageComponent]
    });

    fixture = TestBed.createComponent(GamePageComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
