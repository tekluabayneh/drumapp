import { useEffect, useRef, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { e, t } from "../Components/Songs";
import $ from "jquery";
const SongPlayHome = () => {
  const [toggle, settoggle] = useState(false);
  let [playmode, setplaymode] = useState(false);
  let [volume, setVolume] = useState(0.5);
  const audioRef = useRef(new Audio());
  audioRef.current.muted = playmode;
  const handelkeyevent = (event) => {
    try {
      let keyEvent;
      const validKeys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];

      // check if the event is from the keyevnt or from the event.target
      if (event.type == "keydown") {
        // checking if the event key is ont includes or other key
        if (!validKeys.includes(event.key.toUpperCase())) {
          console.log(`Ignored invalid key: ${keyEvent}`);
          return;
        }
        keyEvent = event.key ? event.key.toUpperCase() : null;
      } else if (event.type == "click") {
        // checking if the event key is ont includes or other key
        if (!validKeys.includes(event.target.innerText)) {
          console.log(`Ignored invalid key: ${keyEvent}`);
          return;
        }
        keyEvent = event.target.innerText.toUpperCase();
      }

      const sound = toggle
        ? e.find((s) => s.keyTrigger === keyEvent)
        : t.find((s) => s.keyTrigger === keyEvent);

      if (sound) {
        audioRef.current.src = sound.url;
        $("#display").text(sound.id);
        audioRef.current.play().catch((error) => console.log(error));
      }

      $(".drum-pad").on("click", function () {
        $(this).css({
          background: "red",
          transform: "translate(1px, -1px)",
          transition: "transform 0.2s ease",
          boxShadow: "none",
        });

        setInterval(() => {
          $(this).css({
            background: "gray",
            transform: "translate(0px)",
            transition: "transform 0.2s ease",
            boxShadow: "black 3px 3px 5px",
          });
        }, 300);
      });

      // adding style based on key id
      $(document).on("keydown", (event) => {
        // Check if the key pressed matches the sound keyTrigger
        if (event.key.toUpperCase() === sound.keyTrigger) {
          // Change the background color of the corresponding drum pad
          $(`#${sound.keyTrigger}`).css({
            backgroundColor: "#fec7c7",
            transform: "translate(1px, -1px)",
            transition: "transform 0.2s ease",
            boxShadow: "none",
          });

          setInterval(() => {
            $(`#${sound.keyTrigger}`).css({
              backgroundColor: "gray",
              boxShadow: " black 3px 3px 5px",
            });
          }, 300);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(playmode);
  // handeling the volume
  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    $("#display").text(newVolume);
    audioRef.current.volume = newVolume;
  };

  useEffect(() => {
    document.addEventListener("keydown", handelkeyevent);
    return () => {
      document.removeEventListener("keydown", handelkeyevent);
    };
  }, [toggle]);

  return (
    <>
      <div className="inner_container" id="drum-machine">
        {/* bg container */}
        <div className="btn_container pad_bank">
          <div className="sub_flex">
            <button className="drum-pad" id="Q" onClick={handelkeyevent}>
              Q
            </button>
            <button className="drum-pad" id="W" onClick={handelkeyevent}>
              W
            </button>
            <button className="drum-pad" id="E" onClick={handelkeyevent}>
              E
            </button>
          </div>

          <div className="sub_flex">
            <button className="drum-pad" id="A" onClick={handelkeyevent}>
              A
            </button>
            <button className="drum-pad" id="S" onClick={handelkeyevent}>
              S
            </button>
            <button className="drum-pad" id="D" onClick={handelkeyevent}>
              D
            </button>
          </div>

          <div className="sub_flex">
            <button className="drum-pad" id="Z" onClick={handelkeyevent}>
              Z
            </button>
            <button className="drum-pad" id="X" onClick={handelkeyevent}>
              X
            </button>
            <button className="drum-pad" id="C" onClick={handelkeyevent}>
              C
            </button>
          </div>
        </div>

        {/* logo container */}
        <div className="logo">
          <div className="inner-logo">FCC&nbsp;</div>

          <i className="fab fa-free-code-camp"></i>
        </div>

        {/* controllercontainer */}
        <div className="controls-container main">
          <div className="control" id="power">
            <p>Power</p>
            <div className="select">
              <button
                type="button"
                onClick={() => setplaymode((playmode) => !playmode)}
              ></button>
            </div>
          </div>

          <p id="display">Heater Kit</p>

          <div className="volume-slider">
            <input
              value={volume}
              onChange={handleVolumeChange}
              max="1"
              min="0"
              step="0.01"
              type="range"
            />
          </div>

          <div className="control">
            <p>Bank</p>
            <div className="select">
              <button
                type="button"
                onClick={() => settoggle((toggle) => !toggle)}
              ></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SongPlayHome;
