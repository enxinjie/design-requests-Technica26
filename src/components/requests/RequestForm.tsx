import {FormEvent, useState} from "react";
import {CreateDesignRequestInput, TechnicaTeam, DesignType, DeliveryFileType, DesignRequest, PersonSummary} from "../../types/request";

import { db } from "../../firebase/firebase";

import {
  collection,
  doc,
  setDoc
} from "firebase/firestore";

interface FormErrors {
  teams?: string;
  designTypes?: string;
  desiredFileTypes?: string;
  otherDesignType?: string;
  otherFileType?: string;
}




const RequestForm = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [links, setLinks] = useState("");
  const [references, setReferences] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
    writtenElements: "",
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
 

  async function handleSubmit(form: FormEvent<HTMLFormElement>): Promise<void> {
    form.preventDefault();
    if (!validateForm()) {
      return;
    }

    try{ 
      var submission = {...formData, inspirationLinks: links.split("\n").map(link => link.trim()).filter(link => link !== ""), referenceAssetUrls: references.split("\n").map(assests => assests.trim()).filter(assests => assests !== "")};
      setFormData(submission);
      const formRef = collection(db, "designRequests");

      const docRef = doc(formRef);
      const currentUser: PersonSummary = {id: "test-user", fullName: "Test User", email: "test@example.com"};

      const request: DesignRequest = {...submission, id: docRef.id, requester: currentUser, createdAt: new Date().toISOString(),   assignedDesigners: [], checkInDeadline: null, internalFinalDeadline: null, emergencyReviewStatus: (submission.emergencyRequested? "awaiting-review" : "not-required") ,status: "new"}
      
      await setDoc(docRef, request);
      setSubmitSuccess(true);

      setFormData({
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
        writtenElements: "",
        referenceAssetUrls: [],
        inspirationLinks: [],
      });

      setLinks("");
      setReferences("");
      setErrors({});
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);

    }catch(error){
      console.error("Error adding document:", error);

    }
   
  }

const validateForm = (): boolean => {
  const newErrors: FormErrors = {};

  if (formData.teams.length === 0 ) {
    newErrors.teams = "Please select at least one team."
  }
  if (formData.designTypes.length === 0 ) {
    newErrors.designTypes = "Please select at least one design type."
  }
  if(formData.desiredFileTypes.length === 0) {
    newErrors.desiredFileTypes = "Please select at least one desired file type."
  }
  if(formData.designTypes.includes("other") && !formData.otherDesignType?.trim()) {
    newErrors.otherDesignType = "Please specify the other design type."
  }
  if(formData.desiredFileTypes.includes("other") && !formData.otherFileType?.trim()) {
    newErrors.otherFileType = "Please specify the other file type."
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
}


  return (
    <section className="rounded-2xl border border-dashed border-brand-500 bg-white p-6">
      <h2 className="text-xl font-semibold">Design Request Form</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        <div className="space-y-1">
          <label htmlFor="completionDate" className="block text-md font-medium text-gray-700"><b>Preferred Completion Date </b>(At leat 2 weeks in advance) <span className="text-red-500">*</span> </label>
          <input onChange={(e) => setFormData({...formData, requestedCompletionDate: e.target.value})} value = {formData.requestedCompletionDate} type="date" id="completionDate" name="completionDate" required className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"/>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <label htmlFor="emergency" className="block text-md font-medium text-gray-700"><b>Emergency Request</b> (less than 2 weeks notice) -  please contact the design directors (Kitty Shi & Mykha Floresca) before submitting the form to see what our capacity is</label>
            <input onChange={(e) => setFormData({...formData, emergencyRequested: e.target.checked})} checked={formData.emergencyRequested} type="checkbox" id="emergency" name="emergency" className="h-4 w-4"/>
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="teams" className="block text-md font-medium text-gray-700"><b>Teams(s)</b><span className="text-red-500">*</span></label>
          {errors.teams && (
            <p className="text-red-500 text-sm mb-2">
              {errors.teams}
            </p>
          )}

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
          
          {errors.designTypes && (
            <p className="text-red-500 text-sm mb-2">
              {errors.designTypes}
            </p>
          )}
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
              <>
                <input onChange={(e) => setFormData({...formData, otherDesignType: e.target.value,})} type="text" placeholder="Enter design type" value={formData.otherDesignType ?? ""} className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"/>
                
                {errors.otherDesignType && (
                  <p className="text-red-500 text-sm mb-2">
                    {errors.otherDesignType}
                  </p>
                )}
              </>
            )}
              
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="fileTypes" className="block text-md font-medium text-gray-700"><b>Desired File Type(s)</b> - all file types the design should be delivered in<span className="text-red-500">*</span></label>
          
          {errors.desiredFileTypes && (
            <p className="text-red-500 text-sm mb-2">
              {errors.desiredFileTypes}
            </p>
          )}

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
              <>
                <input onChange={(e) => setFormData({...formData, otherFileType: e.target.value,})} type="text" placeholder="Enter other file type" value={formData.otherFileType ?? ""} className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"/>
              
                {errors.otherFileType && (
                  <p className="text-red-500 text-sm">
                    {errors.otherFileType}
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="designName" className="block text-md font-medium text-gray-700"><b>Name of Design</b> - what is your intention/vision for this design? (ex. themes, colors, restrictions)<span className="text-red-500">*</span> </label>
          <textarea onChange={(e) => setFormData({...formData, title: e.target.value})} value={formData.title} rows={1} id="designName" name="designName" required className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pink-500 focus:outline-none"></textarea>
        </div>

        <div className="space-y-1">
          <label htmlFor="description" className="block text-md font-medium text-gray-700"><b>Description of Design</b> - what is your intention/vision for this design? (ex. themes, colors, restrictions)<span className="text-red-500">*</span> </label>
          <textarea onChange={(e) => setFormData({...formData, description: e.target.value})} value={formData.description} id="description" name="description" required className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"></textarea>
        </div>


        <div className="space-y-1">
          <label htmlFor="dimensions" className="block text-md font-medium text-gray-700"><b>Dimensions of Graphic</b> (width x height, pixel x pixel if applicable) <span className="text-red-500">*</span> </label>
          <textarea onChange={(e) => setFormData({...formData, dimensions: e.target.value})} value={formData.dimensions} rows={1} id="dimensions" name="dimensions" className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pink-500 focus:outline-none " required></textarea>
        </div>

        <div className="space-y-1">
          <label htmlFor="writtenElements" className="block text-md font-medium text-gray-700"><b>Written Elements (title, body text, dates)</b> - please give exact wording of what will go on the design</label>
          <textarea onChange={(e) => setFormData({...formData, writtenElements: e.target.value})} value={formData.writtenElements ?? ""} id="writtenElements" name="writtenElements" className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"></textarea>
        </div>

        <div className="space-y-1">
          <label htmlFor="visualFiles" className="block text-md font-medium text-gray-700"><b>Link to Necessary Visual Elements</b> - ex. photos, specific illustrations, logos, QR codes/links (if more than 10, contact design directors)</label>
          <label className="block text-md font-medium text-gray-700"><b>Please paste one link per line</b></label>
          <textarea onChange={(e) => setReferences(e.target.value)} value={references} id="visualFiles" name="visualFiles" className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"></textarea>
        </div>

        <div className="space-y-1">       
          <label htmlFor="inspoLinks" className="block text-md font-medium text-gray-700"><b>Links to Inspiration</b> - do you have a specific vision? (ex. moodboards, other artists'/companies' graphics)</label>
          <label className="block text-md font-medium text-gray-700"><b>Please paste one link per line</b></label>
          <textarea onChange={(e) => setLinks(e.target.value)} value={links} id="inspoLinks" name="inspoLinks" className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"></textarea>
        
        </div>  

        {submitSuccess && (
          <p className="mt-4 rounded-md bg-green-100 p-3 text-green-700">
            ✅ Your design request has been submitted successfully!
          </p>
        )}
        <button type="submit" className="mt-4 rounded-lg bg-pink-600 px-6 py-3 font-medium text-white transition hover:bg-pink-700">Submit Request</button>
        

      </form>
    </section>
  );
};

export default RequestForm;
