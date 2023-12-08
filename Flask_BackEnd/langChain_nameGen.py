from langchain.llms import HuggingFaceHub
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.agents import load_tools, initialize_agent, AgentType, AgentExecutor
from dotenv import load_dotenv

# LoaD APi key
load_dotenv()


##Generate response based on input parameters that fit into the prompt
#Prompt could use heavy tweaking to give better responses 
##Could not implment agents in a good way, and could use some form of mememory 
def create_pet_name(petType, petNamePrompt):
    llm = HuggingFaceHub(repo_id="databricks/dolly-v2-3b", model_kwargs={"temperature": 0.9, "max_length":64} )

    prompt_template_name = PromptTemplate(
        input_variables=['petType', 'petNamePrompt'],
        template="Your job is to generate and list 5 pet names for a {petType} that is {petNamePrompt}"
    )

    llm_chain = LLMChain(llm=llm, prompt=prompt_template_name, output_key="petName")

    response = llm_chain({'petType': petType, 'petNamePrompt': petNamePrompt})
    return response


if __name__ == "__main__":
    main()
    # print(generate_pet_name("dog", "Black and white"))