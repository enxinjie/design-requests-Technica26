import {FormEvent, useState} from "react";
import {CreateDesignRequestInput, TechnicaTeam, DesignType, DeliveryFileType, DesignRequest} from "../../types/request";
import { useAuth } from "../../context/AuthContext";

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
  const { userProfile } = useAuth();
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

    if (!userProfile) {
      return;
    }

    try{ 
      var submission = {...formData, inspirationLinks: links.split("\n").map(link => link.trim()).filter(link => link !== ""), referenceAssetUrls: references.split("\n").map(assests => assests.trim()).filter(assests => assests !== "")};
      setFormData(submission);
      const formRef = collection(db, "designRequests");

      const docRef = doc(formRef);

      const request: DesignRequest = {...submission, id: docRef.id, requester: userProfile, createdAt: new Date().toISOString(),   assignedDesigners: [], checkInDeadline: null, internalFinalDeadline: null, emergencyReviewStatus: (submission.emergencyRequested? "awaiting-review" : "not-required") ,status: "new"}
      
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
    <section className="rounded-2xl border border-dashed border-[#B6A1C4] bg-white p-6">
      <h2 className="text-xl font-semibold text-[#2D2D2D]">Design Request Form</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">

        <div className="space-y-1">
          <label htmlFor="completionDate" className="block text-md font-medium text-[#464346]"><b>Preferred Completion Date </b>(At leat 2 weeks in advance) <span className="text-[#FF7BAC]">*</span> </label>
          <input onChange={(e) => setFormData({...formData, requestedCompletionDate: e.target.value})} value = {formData.requestedCompletionDate} type="date" id="completionDate" name="completionDate" required className="mt-1 w-full rounded-lg border border-[#B6A1C4] px-4 py-2 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#B6A1C4]"/>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <label htmlFor="emergency" className="block text-md font-medium text-[#464346]"><b>Emergency Request</b> (less than 2 weeks notice) -  please contact the design directors (Kitty Shi & Mykha Floresca) before submitting the form to see what our capacity is</label>
            <input onChange={(e) => setFormData({...formData, emergencyRequested: e.target.checked})} checked={formData.emergencyRequested} type="checkbox" id="emergency" name="emergency" className="h-4 w-4"/>
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="teams" className="block text-md font-medium text-[#464346]"><b>Teams(s)</b><span className="text-[#FF7BAC]">*</span></label>
          {errors.teams && (
            <p className="text-[#FF7BAC] text-sm mb-2">
              {errors.teams}
            </p>
          )}

          <div className="flex flex-col gap-2">
            <label>
              <input
                type="checkbox"
                checked={formData.teams.includes("breach")}
                onChange={() => handleTeamChange("breach")}
                className="accent-[#00FFFF]"

              />
              Breach(Brand/Outreach)
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.teams.includes("inclusive-communities")}
                onChange={() => handleTeamChange("inclusive-communities")}
                className="accent-[#00FFFF]"
              />
              Inclusive Communities
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.teams.includes("events")}
                onChange={() => handleTeamChange("events")}
                className="accent-[#00FFFF]"
              />
              Events
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.teams.includes("experience")}
                onChange={() => handleTeamChange("experience")}
                className="accent-[#00FFFF]"
              />
              Experience
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.teams.includes("operations")}
                onChange={() => handleTeamChange("operations")}
                className="accent-[#00FFFF]"
              />
              Operations
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.teams.includes("sponsorship")}
                onChange={() => handleTeamChange("sponsorship")}
                className="accent-[#00FFFF]"
              />
              Sponsorship
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.teams.includes("finance")}
                onChange={() => handleTeamChange("finance")}
                className="accent-[#00FFFF]"
              />
              Finance
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.teams.includes("tech")}
                onChange={() => handleTeamChange("tech")}
                className="accent-[#00FFFF]"
              />
              Tech
            </label>
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="designType" className="block text-md font-medium text-[#464346]"><b>Type of Design Needed</b><span className="text-[#FF7BAC]">*</span></label>
          
          {errors.designTypes && (
            <p className="text-[#FF7BAC] text-sm mb-2">
              {errors.designTypes}
            </p>
          )}
          <div className="flex flex-col gap-2">
            <label>
              <input
                type="checkbox"
                checked={formData.designTypes.includes("social-media-graphic")}
                onChange={() => handleDesignTypeChange("social-media-graphic")}
                className="accent-[#00FFFF]"
              />
              Social Media Graphic
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.designTypes.includes("physical-marketing-material")}
                onChange={() => handleDesignTypeChange("physical-marketing-material")}
                className="accent-[#00FFFF]"
              />
              Physical Marketing Material
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.designTypes.includes("illustration")}
                onChange={() => handleDesignTypeChange("illustration")}
                className="accent-[#00FFFF]"
              />
              Illustration
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.designTypes.includes("ui-ux")}
                onChange={() => handleDesignTypeChange("ui-ux")}
                className="accent-[#00FFFF]"
              />
              UI/UX
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.designTypes.includes("swag")}
                onChange={() => handleDesignTypeChange("swag")}
                className="accent-[#00FFFF]"
              />
              Swag
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.designTypes.includes("animation")}
                onChange={() => handleDesignTypeChange("animation")}
                className="accent-[#00FFFF]"
              />
              Animation
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.designTypes.includes("other")}
                onChange={() => handleDesignTypeChange("other")}
                className="accent-[#00FFFF]"
              />
              Other
            </label>

            {formData.designTypes.includes("other") && (
              <>
                <input onChange={(e) => setFormData({...formData, otherDesignType: e.target.value,})} type="text" placeholder="Enter design type" value={formData.otherDesignType ?? ""} className="mt-1 w-full rounded-lg border border-[#B6A1C4] px-4 py-2 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#B6A1C4]"/>
                
                {errors.otherDesignType && (
                  <p className="text-[#FF7BAC] text-sm mb-2">
                    {errors.otherDesignType}
                  </p>
                )}
              </>
            )}
              
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="fileTypes" className="block text-md font-medium text-[#464346]"><b>Desired File Type(s)</b> - all file types the design should be delivered in<span className="text-[#FF7BAC]">*</span></label>
          
          {errors.desiredFileTypes && (
            <p className="text-[#FF7BAC] text-sm mb-2">
              {errors.desiredFileTypes}
            </p>
          )}

          <div className="flex flex-col gap-2">
            <label>
              <input
                type="checkbox"
                checked={formData.desiredFileTypes.includes("svg")}
                onChange={() => handleDesignFileChange("svg")}
                className="accent-[#00FFFF]"
              />
              .svg
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.desiredFileTypes.includes("pdf")}
                onChange={() => handleDesignFileChange("pdf")}
                className="accent-[#00FFFF]"
              />
              .pdf
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.desiredFileTypes.includes("png-jpg-mp4")}
                onChange={() => handleDesignFileChange("png-jpg-mp4")}
                className="accent-[#00FFFF]"
              />
              .png/.jpg/.mp4
            </label>

            <label>
              <input
                type="checkbox"
                checked={formData.desiredFileTypes.includes("other")}
                onChange={() => handleDesignFileChange("other")}
                className="accent-[#00FFFF]"
              />
              Other
            </label>

            {formData.desiredFileTypes.includes("other") && (
              <>
                <input onChange={(e) => setFormData({...formData, otherFileType: e.target.value,})} type="text" placeholder="Enter other file type" value={formData.otherFileType ?? ""} className="mt-1 w-full rounded-lg border border-[#B6A1C4] px-4 py-2 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#B6A1C4]"/>
              
                {errors.otherFileType && (
                  <p className="text-[#FF7BAC] text-sm">
                    {errors.otherFileType}
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="designName" className="block text-md font-medium text-[#464346]"><b>Name of Design</b> - what is your intention/vision for this design? (ex. themes, colors, restrictions)<span className="text-[#FF7BAC]">*</span> </label>
          <textarea onChange={(e) => setFormData({...formData, title: e.target.value})} value={formData.title} rows={1} id="designName" name="designName" required className="mt-1 w-full rounded-lg border border-[#B6A1C4] px-4 py-2 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#B6A1C4]"></textarea>
        </div>

        <div className="space-y-1">
          <label htmlFor="description" className="block text-md font-medium text-[#464346]"><b>Description of Design</b> - what is your intention/vision for this design? (ex. themes, colors, restrictions)<span className="text-[#FF7BAC]">*</span> </label>
          <textarea onChange={(e) => setFormData({...formData, description: e.target.value})} value={formData.description} id="description" name="description" required className="mt-1 w-full rounded-lg border border-[#B6A1C4] px-4 py-2 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#B6A1C4]"></textarea>
        </div>


        <div className="space-y-1">
          <label htmlFor="dimensions" className="block text-md font-medium text-[#464346]"><b>Dimensions of Graphic</b> (width x height, pixel x pixel if applicable) <span className="text-[#FF7BAC]">*</span> </label>
          <textarea onChange={(e) => setFormData({...formData, dimensions: e.target.value})} value={formData.dimensions} rows={1} id="dimensions" name="dimensions" className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pink-500 focus:outline-none " required></textarea>
        </div>

        <div className="space-y-1">
          <label htmlFor="writtenElements" className="block text-md font-medium text-[#464346]"><b>Written Elements (title, body text, dates)</b> - please give exact wording of what will go on the design</label>
          <textarea onChange={(e) => setFormData({...formData, writtenElements: e.target.value})} value={formData.writtenElements ?? ""} id="writtenElements" name="writtenElements" className="mt-1 w-full rounded-lg border border-[#B6A1C4] px-4 py-2 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#B6A1C4]"></textarea>
        </div>

        <div className="space-y-1">
          <label htmlFor="visualFiles" className="block text-md font-medium text-[#464346]"><b>Link to Necessary Visual Elements</b> - ex. photos, specific illustrations, logos, QR codes/links (if more than 10, contact design directors)</label>
          <label className="block text-md font-medium text-[#464346]"><b>Please paste one link per line</b></label>
          <textarea onChange={(e) => setReferences(e.target.value)} value={references} id="visualFiles" name="visualFiles" className="mt-1 w-full rounded-lg border border-[#B6A1C4] px-4 py-2 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#B6A1C4]"></textarea>
        </div>

        <div className="space-y-1">       
          <label htmlFor="inspoLinks" className="block text-md font-medium text-[#464346]"><b>Links to Inspiration</b> - do you have a specific vision? (ex. moodboards, other artists'/companies' graphics)</label>
          <label className="block text-md font-medium text-[#464346]"><b>Please paste one link per line</b></label>
          <textarea onChange={(e) => setLinks(e.target.value)} value={links} id="inspoLinks" name="inspoLinks" className="mt-1 w-full rounded-lg border border-[#B6A1C4] px-4 py-2 focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#B6A1C4]"></textarea>
        
        </div>  

        {submitSuccess && (
          <p className="mt-4 rounded-md bg-[#B6A1C4]/20 p-3 text-[#190D53]">
            ✅ Your design request has been submitted successfully!
          </p>
        )}
        <button type="submit" className="mt-4 rounded-lg bg-[#FF7BAC] px-6 py-3 font-medium text-white transition hover:bg-[#190D53]">Submit Request</button>
        

      </form>
    </section>
  );
};

export default RequestForm;
