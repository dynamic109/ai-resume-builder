"use client"

export function ResumePreview() {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="aspect-[8.5/11] bg-white p-12 text-sm text-gray-800 space-y-4 overflow-auto max-h-96 md:max-h-full">
        {/* Header */}
        <div className="text-center border-b pb-4">
          <h1 className="text-2xl font-bold">Alex Morgan</h1>
          <p className="text-sm font-semibold text-indigo-600 tracking-wide">SENIOR UX DESIGNER</p>
          <div className="flex justify-center gap-4 mt-2 text-xs">
            <span>alex.morgan@example.com</span>
            <span>+1 (555) 123-4567</span>
            <span>San Francisco, CA</span>
          </div>
        </div>

        {/* Professional Summary */}
        <div>
          <h2 className="font-bold text-xs uppercase tracking-wider mb-2">Professional Summary</h2>
          <p className="text-xs leading-relaxed">
            Passionate and experienced Senior UX Designer with over 7 years of expertise in creating user-centered
            digital products. Proven track record of leading design teams, conducting comprehensive user research, and
            delivering high-fidelity prototypes that drive user engagement. Adept at bridging the gap between design and
            engineering to ensure seamless implementation. Seeking to leverage leadership skills in a challenging
            environment to solve complex user problems.
          </p>
        </div>

        {/* Experience */}
        <div>
          <h2 className="font-bold text-xs uppercase tracking-wider mb-2">Experience</h2>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-xs">TechFlow Inc.</p>
                  <p className="text-xs text-indigo-600">Senior UX Designer</p>
                </div>
                <p className="text-xs">Jan 2020 – Present</p>
              </div>
              <p className="text-xs text-gray-600">San Francisco, CA</p>
              <ul className="mt-1 space-y-1 text-xs">
                <li>
                  • Spearheaded the redesign of the core SaaS platform, resulting in a 25% increase in user retention
                  and a 15% reduction in churn rate within 6 months.
                </li>
                <li>
                  • Led a team of 4 designers, conducting weekly design critiques and mentoring junior members to foster
                  a culture of continuous improvement.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Education */}
        <div>
          <h2 className="font-bold text-xs uppercase tracking-wider mb-2">Education</h2>
          <div className="flex justify-between items-start text-xs">
            <div>
              <p className="font-semibold">Bachelor of Design in Interaction Design</p>
              <p className="text-gray-600">California College of the Arts</p>
            </div>
            <p>2013 - 2017</p>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h2 className="font-bold text-xs uppercase tracking-wider mb-2">Key Skills</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Figma",
              "Adobe Creative Suite",
              "Prototyping",
              "User Research",
              "Wireframing",
              "HTML/CSS",
              "Agile Methodology",
              "Design Systems",
              "Usability Testing",
            ].map((skill) => (
              <span key={skill} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
