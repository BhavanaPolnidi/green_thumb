from flask import Flask, render_template, request
from gradio_client import Client

# Initialize Flask app
app = Flask(__name__)

# Initialize Gradio client
client = Client("PrudhviRajGandrothu/llama-3.1")

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        try:
            disease = request.form['disease']
            prompt = (
                f"Suggest exactly three Indian plants that can help with curing the following disease: {disease}. "
                "For each plant, provide the following information in HTML format:\n"
                "<h2>Suggested Plants</h2>\n"
                "<ul>\n"
                "<li><b>Plant Title:</b> Description of how it helps with the disease.\n"
                "<ul>\n"
                "<li><b>Scientific Name:</b> Provide the scientific name of the plant.</li>\n"
                "<li><b>Benefits:</b> List the benefits of this plant.</li>\n"
                "<li><b>Active Compounds:</b> Key compounds responsible for its medicinal properties.</li>\n"
                "<li><b>Toxic Compounds:</b> Any known toxic compounds and their potential effects.</li>\n"
                "<li><b>Safety and Side Effects:</b> Information on safety, side effects, and interactions.</li>\n"
                "<li><b>Storage Instructions:</b> How to store the plant or its preparations.</li>\n"
                "<li><b>Usage Instructions:</b>\n"
                "<ul>\n"
                "<li>Detail 1</li>\n"
                "<li>Detail 2</li>\n"
                "</ul>\n"
                "</li>\n"
                "<li><b>Alternative Remedies:</b> Other plants or remedies that can be used as alternatives.</li>\n"
                "<li><b>Recipes and Formulations:</b> Specific recipes or ways to prepare the plant for use.</li>\n"
                "</ul>\n"
                "</li>\n"
                "</ul>\n"
                "Ensure that the response includes exactly three plants, each with its own <li> tag, and all sections are detailed and formatted properly within each <li> tag. Avoid any additional information or special characters."
            )
            result = client.predict(
                message=prompt,
                api_name="/chat"
            )
            return render_template('index.html', disease=disease, plants=result)
        except Exception as e:
            print(f"Error: {e}")
            return render_template('index.html', disease=disease, plants="Error occurred while processing your request.")
    
    return render_template('index.html', disease=None, plants=None)

if __name__ == '__main__':
    app.run(debug=True, port=8080)
