import {useState} from "react";
import {CreateDesignRequestInput, TechnicaTeam, DesignType, DeliveryFileType} from "../../types/request";

const RequestForm = () => {
  const[formData, setFormData] = useState<CreateDesignRequestInput>({
    title: "",
    description: "",
    teams: [],
    requestedCompletionDate: "",
    emergencyRequested: false,
    designTypes: [],
    otherDesignType: null,
    desiredFileTypes: [],
    otherFileType: null,
    dimensions: "",
    writtenElements: null,
    referenceAssetUrls: [],
    inspirationLinks: []

  });

  const handleTeamChange = (team: TechnicaTeam) => {
    if(formData.teams.includes(team)) {
      setFormData({...formData, teams: formData.teams.filter(t => t !== team)});
    } else {
      setFormData({...formData, teams: [...formData.teams, team]});
    }
  }; 
  
  const handleDesignFileChange = (file: DeliveryFileType) => {
    if(formData.desiredFileTypes.includes(file)) {
      setFormData({...formData, desiredFileTypes: formData.desiredFileTypes.filter(t => t !== file)});
    } else {
      setFormData({...formData, desiredFileTypes: [...formData.desiredFileTypes, file]});
    }
  }; 

  const handleDesignTypeChange = (type: DesignType) => {
    if(formData.designTypes.includes(type)) {
      setFormData({...formData, designTypes: formData.designTypes.filter(t => t !== type)});
    } else {
      setFormData({...formData, designTypes: [...formData.designTypes, type]});
    }
  }; 

  const handleLinkChange = (links:string) => {
    setFormData({...formData, inspirationLinks: links.split("\n").map(link => link.trim()).filter(link => link !== "")});
  }; 

  return (
    <section className="rounded-2xl border border-dashed border-brand-500 bg-white p-6">
      <h2 className="text-xl font-semibold">Design Request Form</h2>
      <form className="flex flex-col gap-5">

        <div className="space-y-1">
          <label htmlFor="name" className="block text-md font-medium text-gray-700"><b>Name</b> <span className="text-red-500">*</span> </label>
          <input  type="text" id="name" name="name" required className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"/>
        </div>

        <div className="space-y-1">
          <label htmlFor="completionDate" className="block text-md font-medium text-gray-700"><b>Preferred Completion Date </b>(At leat 2 weeks in advance) <span className="text-red-500">*</span> </label>
          <input onChange={(e) => setFormData({...formData, requestedCompletionDate: e.target.value})} type="date" id="completionDate" name="completionDate" required className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"/>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <label htmlFor="emergency" className="block text-md font-medium text-gray-700"><b>Emergency Request</b> (less than 2 weeks notice) -  please contact the design directors (Kitty Shi & Mykha Floresca) before submitting the form to see what our capacity is</label>
            <input onChange={(e) => setFormData({...formData, emergencyRequested: e.target.checked})} type="checkbox" id="emergency" name="emergency" className="h-4 w-4"/>
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="teams" className="block text-md font-medium text-gray-700"><b>Teams(s)</b><span className="text-red-500">*</span></label>
        
          <div className="flex flex-col gap-2">
            <label>
              <input
                type="checkbox"
                checked={formData.teams.includes("breach")}
                onChange={() => handleTeamChange("breach")}
              />
              Breach(Brand/Outreach)
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.teams.includes("inclusive-communities")}
                onChange={() => handleTeamChange("inclusive-communities")}
              />
              Inclusive Communities
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.teams.includes("events")}
                onChange={() => handleTeamChange("events")}
              />
              Events
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.teams.includes("experience")}
                onChange={() => handleTeamChange("experience")}
              />
              Experience
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.teams.includes("operations")}
                onChange={() => handleTeamChange("operations")}
              />
              Operations
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.teams.includes("sponsorship")}
                onChange={() => handleTeamChange("sponsorship")}
              />
              Sponsorship
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.teams.includes("finance")}
                onChange={() => handleTeamChange("finance")}
              />
              Finance
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.teams.includes("tech")}
                onChange={() => handleTeamChange("tech")}
              />
              Tech
            </label>
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="designType" className="block text-md font-medium text-gray-700"><b>Type of Design Needed</b><span className="text-red-500">*</span></label>
          
          <div className="flex flex-col gap-2">
            <label>
              <input
                type="checkbox"
                checked={formData.designTypes.includes("social-media-graphic")}
                onChange={() => handleDesignTypeChange("social-media-graphic")}
              />
              Social Media Graphic
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.designTypes.includes("physical-marketing-material")}
                onChange={() => handleDesignTypeChange("physical-marketing-material")}
              />
              Physical Marketing Material
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.designTypes.includes("illustration")}
                onChange={() => handleDesignTypeChange("illustration")}
              />
              Illustration
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.designTypes.includes("ui-ux")}
                onChange={() => handleDesignTypeChange("ui-ux")}
              />
              UI/UX
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.designTypes.includes("swag")}
                onChange={() => handleDesignTypeChange("swag")}
              />
              Swag
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.designTypes.includes("animation")}
                onChange={() => handleDesignTypeChange("animation")}
              />
              Animation
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.designTypes.includes("other")}
                onChange={() => handleDesignTypeChange("other")}
              />
              Other
            </label>

            {formData.designTypes.includes("other") && (
              <input onChange={(e) => setFormData({...formData, otherDesignType: e.target.value,})} type="text" placeholder="Enter design type" value={formData.otherDesignType ?? ""} className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"/>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="fileTypes" className="block text-md font-medium text-gray-700"><b>Desired File Type(s)</b> - all file types the design should be delivered in**</label>
          <div className="flex flex-col gap-2">
            <label>
              <input
                type="checkbox"
                checked={formData.desiredFileTypes.includes("svg")}
                onChange={() => handleDesignFileChange("svg")}
              />
              .svg
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.desiredFileTypes.includes("pdf")}
                onChange={() => handleDesignFileChange("pdf")}
              />
              .pdf
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.desiredFileTypes.includes("png-jpg-mp4")}
                onChange={() => handleDesignFileChange("png-jpg-mp4")}
              />
              .png/.jpg/.mp4
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.desiredFileTypes.includes("other")}
                onChange={() => handleDesignFileChange("other")}
              />
              Other
            </label>

            {formData.desiredFileTypes.includes("other") && (
              <input onChange={(e) => setFormData({...formData, otherFileType: e.target.value,})} type="text" placeholder="Enter design type" value={formData.otherDesignType ?? ""} className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"/>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="designName" className="block text-md font-medium text-gray-700"><b>Name of Design</b> <span className="text-red-500">*</span> </label>
          <textarea onChange={(e) => setFormData({...formData, title: e.target.value})} rows={1} id="designName" name="designName" required className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pink-500 focus:outline-none"></textarea>
        </div>

        <div className="space-y-1">
          <label htmlFor="description" className="block text-md font-medium text-gray-700"><b>Description of Design</b> <span className="text-red-500">*</span> </label>
          <textarea onChange={(e) => setFormData({...formData, description: e.target.value})} id="description" name="description" required className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"></textarea>
        </div>


        <div className="space-y-1">
          <label htmlFor="dimesions" className="block text-md font-medium text-gray-700"><b>Dimesions of Grapic</b> (width x height, pixel x pixel if applicable) <span className="text-red-500">*</span> </label>
          <textarea onChange={(e) => setFormData({...formData, dimensions: e.target.value})} rows={1} id="dimesions" name="dimesions" required className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pink-500 focus:outline-none "></textarea>
        </div>

        <div className="space-y-1">
          <label htmlFor="writtenElements" className="block text-md font-medium text-gray-700"><b>Description of Design</b> - what is your intention/vision for this design? (ex. themes, colors, restrictions) <span className="text-red-500">*</span> </label>
          <textarea onChange={(e) => setFormData({...formData, writtenElements: e.target.value})} id="writtenElements" name="writtenElements" required   className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"></textarea>
        </div>

        <div className="space-y-1">
          <label htmlFor="visualFiles" className="block text-md font-medium text-gray-700"><b>Link to Necessary Visual Elements</b> - ex. photos, specific illustrations, logos, QR codes/links (if more than 10, contact design directors)</label>
          <input  type = "file" id="visualFiles" name="visualFiles" multiple  className="block w-full text-md text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-pink-50 file:px-4 file:py-2 file:text-pink-600 hover:file:bg-pink-100"></input>
        </div>

        <div className="space-y-1">       
          <label htmlFor="inspoLinks" className="block text-md font-medium text-gray-700"><b>Links to Inspiration</b> - do you have a specific vision? (ex. moodboards, other artists'/companies' graphics)</label>
          <label className="block text-md font-medium text-gray-700"><b>Please paste one link per line</b></label>
          <textarea onChange={(e) => handleLinkChange(e.target.value)} id="inspoLinks" name="inspoLinks" className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"></textarea>
        
        </div>  

        <button type="submit" className="mt-4 rounded-lg bg-pink-600 px-6 py-3 font-medium text-white transition hover:bg-pink-700">Submit Request</button>

      </form>
    </section>
  );
};

export default RequestForm;
