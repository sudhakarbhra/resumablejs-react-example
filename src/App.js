import "./App.css";
import FileUpload from "./FileUpload";

function App() {
  return (
    <div className="App">
      {/* File Upload */}

      <FileUpload
        uploadUrl="https://espray.projectdemo.site/api/add/spray/video"
        token="Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNTU0NGVjZWQ3NGNhYzYwYTg5ZGQzZWQwYzYzNjU4NjRlNDQyMGVlMzljZjE0NDE3NjBjMGRiMGI4OWVmZGRkOTdlZmY0OGY5NDE4MTA2MjciLCJpYXQiOjE2MTE3NDIwMzAsIm5iZiI6MTYxMTc0MjAzMCwiZXhwIjoxNjQzMjc4MDMwLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.BvsvsU2DblfRFsQoh-hx7035H_2fBtRr3_wpvq2Q-NaYrA_bZhLsF66gPCOooYfLujwv9Ab71wMiCtVqyWwfna70Qm4ywtEENW1ukvlBJpjsunUu6kEDWEgZ8Tkq9n5u0VC6LLbB2_GB4071-Nxn3HznuV_3uaqi_ATSON2RWUr9N-P7vq95S2_2Un2RGzLpShXpcSL1AEPJ_yuc-H0dX7pMbpgq21PODY07y5dctMGGzf7KlKonzQnxqNu-VPApMXXad4EdvMj70Va7Kh5dWA3DTBQVmtvM8mRNtSAo82FV_ZsJywGWwVgpcELr8uF8Pnp_loPdVj10g4IR27AONvFp3xwCU7KgqZaZEWS6y9dIbVREaKeAXXASO1biBuEN-YoIX4s2WP2iUwml8ZMHR7VFyrTu2w3lKcI3fIEIUy0TY6DHLwVPRWyRTF6IGTon7AVbVLi-aqj850EbDtfyY6VKDIk-kLxoM2n5jwVqUD0jYgik308oitCP3QIGYK3B5VD9JPJ2Nj5qvII5j-tJsUWeui6ZtEqTGNNBhICk6V-QUAZUqAJgm4CaVBRG6laQJFT7Q7nI_TJ5-re_7GAlGJWi8erVjwny8Utlzo52mSQYQyjD28N_2q7Rltd54yrTAtG0RpxrGWNWk-EUEF6-xzRrjjUU3uUKWJEI-jqKh3w"
        event_id="1734055133"
        title="Title of the video"
        description="This is an sample video description"
      />
    </div>
  );
}

export default App;
