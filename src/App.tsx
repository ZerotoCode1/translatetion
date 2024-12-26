import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { debounce } from 'lodash';
import axios from 'axios'
const App: React.FC = () => {
  const [subtitles, setSubtitles] = useState<any>([]);
  const [dataTranslate, setDataTranslate] = useState<any>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      alert("Please select a .vtt file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;

      const lines = content.trim().split('\n').slice(1)?.filter((item) => item !== '');

      const listConet = []
      const text = []
      for (let i = 0; i < lines.length; i += 3) {
        listConet.push({ [lines[i + 1]]: lines[i + 2] })
        text.push(lines[i + 2])
      }
      console.log(text.slice(0, 10), 'fsdfsdfsdfsdfsd')
      setSubtitles(listConet);
    };

    reader.onerror = () => {
      alert("Error reading file.");
    };

    reader.readAsText(file);
  };
  console.log(subtitles, 'subtitles')
  const handleCallApiTranslate = async () => {
    const totalNodeText = 10;
    const totalCallAPi = Math.ceil(subtitles?.length / totalNodeText);
    const apiCalls = [];

    // Tạo các API calls song song
    for (let i = 0; i < totalCallAPi ; i++) {
      const body = subtitles?.slice(i * totalNodeText, (i + 1) * totalNodeText);

      const apiCall = axios.post('https://test-toeic.online:1443/api/translation-file-vtt', {
        data: body
      })
        .then(res => res.data.result) // Trả về kết quả của mỗi API call
        .catch(error => {
          console.log(error);
          return []; // Trả về mảng rỗng nếu có lỗi
        });

      apiCalls.push(apiCall); // Thêm Promise vào mảng apiCalls
    }

    // Chờ tất cả các API calls hoàn thành
    const results = await Promise.all(apiCalls);

    // Gộp tất cả kết quả lại
    const dataTranslate = results.flat();

    try {

      const data = dataTranslate.filter((item) => item !== undefined).map((item, index) => {
        const firstKey = Object.keys(item).join();
        const timeSub = firstKey?.split('-->');
        console.log(timeSub?.[0], 'timeSub')
        return {
          key: index + 1,
          startTime: timeSub?.[0]?.trim() ?? '',
          endTime: timeSub?.[1]?.trim() ?? '',
          orignalText: subtitles?.find((item: any) => item[firstKey as keyof typeof item])?.[firstKey as keyof typeof item],
          translatedText: item[firstKey as keyof typeof item]
        }
      })
      console.log(data, 'data')
      setDataTranslate(data);
    } catch (error) {
      console.log(error)
    }

  };
  const generateVTTFile = () => {
    let vttContent = "WebVTT\n\n";

    dataTranslate?.map((item: any, index: number) => {
         vttContent += `${index + 1}\n${item?.startTime +`-->`+ item?.endTime}\n${item?.translatedText}\n\n`;
     })
    console.log(vttContent, '=======>')
    const blob = new Blob([vttContent], { type: "text/vtt" });
    const url = URL.createObjectURL(blob);

    // Tạo một link tải file
    const link = document.createElement("a");
    link.href = url;
    link.download = "tranlatetoVi.vtt";
    link.click();

    URL.revokeObjectURL(url);
  }
  useEffect(() => {
    if (subtitles?.length > 0) {
      handleCallApiTranslate()
    }
  }, [subtitles]);
  const handleInput = debounce((record: any, value: string) => {
    const body = [
      {
        [`${record?.startTime} --> ${record?.endTime}`]: value
      }
    ];
    const fetchAPI = async () => {

      try {
        const res = await axios.post('https://test-toeic.online:1443/api/translation-file-vtt', {
          data: body
        })
        console.log(res?.data?.result, 'apiCall')
        if (res?.data?.result) {
          const indexEdit = dataTranslate?.findIndex((item: any) => item?.startTime === record?.startTime && item?.endTime === record?.endTime);
          if (indexEdit !== -1) {
            dataTranslate[indexEdit] = {
              key: record?.key,
              startTime: record?.startTime ?? '',
              endTime: record?.endTime ?? '',
              orignalText: value,
              translatedText: Object.values(res?.data?.result[0])[0]
            };
            setDataTranslate([...dataTranslate])
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (value) {
      fetchAPI()
    }
  }, 2000);
  const handleTranlateInput = debounce((record: any, value: string) => { 
    const indexEdit = dataTranslate?.findIndex((item: any) => item?.startTime === record?.startTime && item?.endTime === record?.endTime);
    if (indexEdit !== -1) {
      dataTranslate[indexEdit] = {
        key: record?.key,
        startTime: record?.startTime ?? '',
        endTime: record?.endTime ?? '',
        orignalText: record?.orignalText,
        translatedText: value
      };
      setDataTranslate([...dataTranslate])
    }
    

  }, 2000);
  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'index',
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: 'Orignal Text',
      dataIndex: 'orignalText',
      key: 'orignalText',
      render: (_text: any, record: any) => {
        console.log(record, _text, 'record')
        return (
          <div
            contentEditable
            suppressContentEditableWarning
            style={{
              width: '400px',
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              outline: 'none',
            }}
            onInput={(e) => {
              const target = e.target as HTMLDivElement;
              handleInput(record, target?.innerText)
            }}
          >
            {record?.orignalText}
          </div>
        )
      },
      width: '400px'
    },
    {
      title: 'Translated Text',
      dataIndex: 'translatedText',
      key: 'translatedText',
       render: (_text: any, record: any) => {
        console.log(record, _text, 'record')
        return (
          <div
            contentEditable
            suppressContentEditableWarning
            style={{
              width: '400px',
              whiteSpace: 'normal',
              wordWrap: 'break-word',
              outline: 'none',
            }}
            onInput={(e) => {
              const target = e.target as HTMLDivElement;
              handleTranlateInput(record, target?.innerText)
            }}
          >
            {record?.translatedText}
          </div>
        )
      },
    },
  ];
  return (
    <div style={{ padding: "20px" }}>
      <h1>Chọn file sub muốn dịch</h1>
      <input type="file" accept=".vtt" onChange={handleFileChange} />
      {
        dataTranslate && <button onClick={generateVTTFile} className="button-18">Tải file</button>
      }
      <h2>Subtitles:</h2>
      <Table dataSource={dataTranslate} columns={columns} />;
    </div>
  );
};

export default App;


