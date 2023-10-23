import React, { useState, useRef } from 'react';
import axios from 'axios';
import { CopyBlock } from "react-code-blocks";
import "../App.js"
import '../componentStyling/GiveResponse.css';

const GiveResponse = ({ fileContent }) => {
  const [generatedText, setGeneratedText] = useState('');
  const useIn = useRef();
  const stringContent = JSON.stringify(fileContent); // Stringify the fileContent
  
  const generateSummary = async () => {
    const userReq = useIn.current.value;
    const prompt = `${userReq}: ${stringContent}`; // Use the prompt with the stringified content
    const maxTokens = 1000;
   
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-003/completions',
        {
          prompt,
          max_tokens: maxTokens
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
          }
        }
      );
      console.log('fileContent:', fileContent);
      console.log('API Response:', response);
      setGeneratedText(response.data.choices[0].text);
    } catch (error) {
      console.error('Error generating text:', error);
    }
  };
//{generatedText}
  return (
    <div className='in-Wrapper'>
      <div className="inputUser">
      <input type="text" ref={useIn} placeholder="what should I do?"className="userChange"/>

      <button className='but' onClick={generateSummary}>give command</button>
      </div>
      <div className='display-area'>hi my name is yar Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio maiores animi nemo eaque architecto, voluptas itaque corrupti maxime ipsa doloribus quisquam! Architecto suscipit ea facere delectus nihil doloremque est veniam? lorem500 Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid molestiae, minus, explicabo minima earum sunt provident amet labore, perspiciatis tempore facilis. Nesciunt, dolores? A aperiam nulla dignissimos, sit sint maxime temporibus error quia distinctio doloremque voluptate ducimus fugiat enim et rem in blanditiis doloribus accusamus eos laboriosam consequuntur nesciunt eius! Explicabo eius fugit, nihil nam illum voluptatum voluptates quibusdam eligendi perferendis molestias consequatur eaque corporis necessitatibus perspiciatis ex nemo esse placeat laborum repellendus id repudiandae veritatis voluptatem expedita. Consectetur, nostrum dolorum, quaerat quo voluptate labore doloribus architecto porro iure dolores placeat aspernatur nemo tempore, hic fugit quis molestiae aliquid quam ducimus repellat molestias corrupti! Natus quam ipsa, mollitia autem ducimus exercitationem modi beatae pariatur eum quasi, laudantium dignissimos placeat dicta? Magnam ipsa iusto laudantium doloribus eius perferendis reiciendis ut non repellat illo! Dolorem omnis expedita enim dolorum? A iusto similique dolore, enim nemo architecto, deserunt accusamus sit quibusdam, quae soluta. Molestiae dolore dolores pariatur sapiente! Officia accusamus error consectetur voluptatum a, ducimus beatae eum debitis aliquid praesentium modi quibusdam itaque. Perspiciatis minus odit ea accusantium omnis commodi doloribus tempora consequuntur earum asperiores dolorum, magnam illo non sint dignissimos provident nulla neque ratione quisquam animi similique laudantium ipsam. Quis sapiente, natus odio distinctio mollitia aperiam consectetur nostrum tempore ea itaque, sequi sint. Iure quisquam, quis, adipisci nulla dolorum hic saepe voluptates quam ea iusto rerum aliquam! Sit, voluptatibus nemo tempora eligendi aliquid minus id quidem, ea quos libero corrupti beatae asperiores commodi. Dolorem minima optio fugit tenetur non quo, ipsum, molestias voluptates eaque ipsam perferendis culpa necessitatibus sit enim quos? Corporis tenetur neque deleniti incidunt qui assumenda, enim iusto magni. In veritatis ipsam quisquam rerum aliquid! Quasi at nemo ipsa, corporis, perferendis numquam nobis doloremque odio dolorem, est expedita ea saepe hic cum consequuntur animi? Laboriosam mollitia vel placeat nobis, fugiat rerum minus ipsam perspiciatis esse eius reiciendis, doloremque suscipit incidunt? Deleniti vel temporibus corporis soluta esse sunt aliquid. Doloribus ad incidunt quaerat beatae eligendi magni blanditiis reprehenderit officiis numquam odit veritatis accusamus amet adipisci omnis repudiandae, qui distinctio ex! Maxime labore voluptatum animi cum quam doloremque dolores recusandae non consectetur, repellat nemo obcaecati libero inventore numquam amet perspiciatis veritatis iusto voluptas voluptate dolorem vero ipsa nihil tenetur? Temporibus ipsum libero assumenda voluptas totam, perspiciatis consectetur sapiente? Alias, minus? Nam accusantium voluptates officiis reprehenderit odit facilis, cum at veniam vitae asperiores repellendus aperiam dolorum minima sunt illum, inventore quasi. Suscipit asperiores itaque nobis accusantium iure! Ipsum veritatis animi minima distinctio rerum porro voluptatibus doloremque iure odio ad quisquam eaque officia numquam vitae suscipit, eius ipsam quia error totam? Amet molestiae minus, quas doloremque excepturi corrupti optio cupiditate unde, rem mollitia illo odit itaque error dolorum rerum distinctio! Excepturi hic sint necessitatibus optio est, asperiores, quod, commodi atque blanditiis perferendis autem iusto eum obcaecati assumenda expedita. Possimus, veritatis. Cumque molestias similique eum culpa laboriosam esse consequuntur? Tempora iusto maiores tempore beatae itaque, ducimus corporis deleniti amet laudantium minima obcaecati quaerat, aliquid molestias? Quibusdam consequuntur, soluta error esse voluptatum inventore nisi a quis?</div>
    </div>
  );
};

export default GiveResponse;
