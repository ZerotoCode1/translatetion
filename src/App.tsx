import { Modal, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { debounce } from 'lodash';
import axios from 'axios'
import Reload from "./Icons/Reload";
import { LoadingOutlined } from '@ant-design/icons';
const App: React.FC = () => {
  const [subtitles, setSubtitles] = useState<any>([]);
  const [dataTranslate, setDataTranslate] = useState<any>();
  const [pageSize, setPageSize] = useState({ page: 1, size: 10 });
  const [loading, setLoading] = useState(false);
  const [indexTitle, setIndexTitle] = useState(false);
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
      console.log(lines, 'lines')

      const listConet = []
      const text = []
      const check = /^\d+$/.test(lines[0]) ? 3 : 2;
      if (/^\d+$/.test(lines[0])) {
        setIndexTitle(true)
      } else {
        setIndexTitle(false)
      }
      for (let i = 0; i < lines.length; i += check) {
        if (/^\d+$/.test(lines[0])) {
          listConet.push({ [lines[i + 1]]: lines[i + 2] })
        } else {
          console.log('nostt')
          listConet.push({ [lines[i]]: lines[i + 1] })
        }
        text.push(lines[i + 2])
      }
      setSubtitles(listConet);
    };

    reader.onerror = () => {
      alert("Error reading file.");
    };

    reader.readAsText(file);
  };
  const handleCallApiTranslate = async () => {
    setLoading(true);
    const totalNodeText = 10;
    const totalCallAPi = Math.ceil(subtitles?.length / totalNodeText);
    const apiCalls = [];

    // Tạo các API calls song song
    for (let i = 0; i < totalCallAPi; i++) {
      const body = subtitles?.slice(i * totalNodeText, (i + 1) * totalNodeText);

      const apiCall = axios.post('https://test-toeic.online:1443/api/translation-file-vtt', {
        data: body
      })
        .then(res => {

          if (!res.data.result) {
            return body;
          } else {
            return res.data.result;
          }

        }

        ) // Trả về kết quả của mỗi API call
        .catch(error => {
          console.log(error);
          return [];
        });

      apiCalls.push(apiCall);
    }

    const results = await Promise.all(apiCalls);

    const dataTranslate = results.flat();
    console.log(dataTranslate, 'dataall')

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
    } finally {
      setLoading(false);
    }

  };
  console.log(indexTitle, 'indexTitle')
  const generateVTTFile = () => {
    let vttContent = "WebVTT\n\n";

    const checkIndex = (item: any, index: any) => {
      if (indexTitle) {
        return `${index + 1}\n${item?.startTime + ` --> ` + item?.endTime}\n${item?.translatedText}\n\n`
      } else {
        return `${item?.startTime + ` --> ` + item?.endTime}\n${item?.translatedText}\n\n`

      }
    }

    dataTranslate?.map((item: any, index: number) => {
      // vttContent += `${index + 1}\n${item?.startTime + `-->` + item?.endTime}\n${item?.translatedText}\n\n`;
      vttContent += checkIndex(item, index)
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
  console.log(loading, 'loading')
  const handleInput = debounce((record: any, value: string) => {
    const body = [
      {
        [`${record?.startTime} --> ${record?.endTime}`]: value
      }
    ];
    const fetchAPI = async () => {
      setLoading(true);

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
      setLoading(false);
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
    {
      title: 'Action',
      key: 'action',
      render: (_text: any, record: any) => {
        console.log(record.orignalText, 'fsfsdfsdfsdfsdfsdfsd')
        return (
          <span style={{ cursor: 'pointer' }} onClick={() => {
            setLoading(true)
            handleInput(record, record.orignalText)
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 40 40">
              <path fill="#8bb7f0" d="M23.596,2.871v4.444c5.533,1.566,9.589,6.65,9.589,12.684c0,7.282-5.903,13.185-13.185,13.185 S6.815,27.282,6.815,20c0-4.897,2.671-9.168,6.635-11.44l3.05,3.05V2.5H7.39l2.935,2.935C5.614,8.57,2.5,13.916,2.5,20 c0,9.665,7.835,17.5,17.5,17.5S37.5,29.665,37.5,20C37.5,11.568,31.536,4.53,23.596,2.871z"></path><path fill="#4e7ab5" d="M20,37.986c-9.918,0-17.987-8.068-17.987-17.986c0-5.826,2.813-11.252,7.555-14.634L6.216,2.014 h10.771v10.771l-3.614-3.613C9.619,11.472,7.302,15.587,7.302,20c0,7.002,5.696,12.698,12.698,12.698S32.698,27.002,32.698,20 c0-5.654-3.797-10.678-9.235-12.216l-0.354-0.101V2.272l0.586,0.122C31.976,4.125,37.987,11.529,37.987,20 C37.987,29.918,29.918,37.986,20,37.986z M8.565,2.986l2.524,2.525L10.594,5.84C5.831,9.011,2.987,14.304,2.987,20 c0,9.381,7.632,17.014,17.013,17.014S37.013,29.381,37.013,20c0-7.811-5.403-14.663-12.931-16.52v3.472 c5.665,1.771,9.589,7.083,9.589,13.048c0,7.538-6.133,13.671-13.672,13.671S6.328,27.538,6.328,20 c0-4.885,2.636-9.43,6.88-11.862l0.323-0.186l2.482,2.482V2.986H8.565z"></path>
            </svg>
          </span>
        );
      },
    }
  ];
  useEffect(() => {

    if (dataTranslate) {
      const reTranslate = dataTranslate.filter((item: any) =>
        item?.orignalText === item?.translatedText
      );
      console.log(reTranslate, 'reTranslate')
    }


  }, [dataTranslate])


  const translatePage = async () => {
    setLoading(true);
    const startIndex = pageSize.page === 1 ? 0 : (pageSize.page - 1) * pageSize.size;
    const endIndex = pageSize.page * pageSize.size;
    const sliceDataTranslate = dataTranslate?.slice(startIndex, endIndex);
    const reCallApiTranslate = async () => {
      const totalNodeText = 1;
      const totalCallAPi = Math.ceil(sliceDataTranslate?.length / totalNodeText);
      const apiCalls = [];

      // Tạo các API calls song song
      for (let i = 0; i < totalCallAPi; i++) {
        const revertBody = sliceDataTranslate?.map((item: any) => {
          return {
            [`${item?.startTime} --> ${item?.endTime}`]: item?.orignalText
          }
        })
        const body = revertBody?.slice(i * totalNodeText, (i + 1) * totalNodeText);

        const apiCall = axios.post('https://test-toeic.online:1443/api/translation-file-vtt', {
          data: body
        })
          .then(res => {

            if (!res.data.result) {
              return body;
            } else {
              return res.data.result;
            }

          }

          ) // Trả về kết quả của mỗi API call
          .catch(error => {
            console.log(error);
            return [];
          }
          );

        apiCalls.push(apiCall);
      }

      const results = await Promise.all(apiCalls);

      const dataTranslatev2 = results.flat();
      const sliceData = sliceDataTranslate.map((item: any) => {
        const findData = dataTranslatev2.filter((item) => item !== undefined).find((itemv2: any) => {
          const firstKey = Object.keys(itemv2).join();
          const timeSub = firstKey?.split('-->');
          console.log(timeSub, 'firstKey')
          return item.startTime === (timeSub?.[0]?.trim() ?? "")
            && item.endTime === (timeSub?.[1]?.trim() ?? "")
        }
        );
        return {
          key: item.key,
          startTime: item.startTime ?? '',
          endTime: item.endTime ?? '',
          orignalText: item.orignalText,
          translatedText: findData ? Object.values(findData)[0] : item.translatedText
        }
      })
      const datatranslateCopy = [...dataTranslate];
      datatranslateCopy.splice(startIndex, sliceData.length, ...sliceData);
      setDataTranslate(datatranslateCopy);
      setLoading(false);

    };
    reCallApiTranslate()
  }
  console.log(subtitles, 'dataTranslate')
  return (
    <div style={{ padding: "20px" }}>
      <h1 className="text-[30px] font-semibold mb-4">Chọn file sub muốn dịch</h1>
      <input type="file" accept=".vtt" onChange={handleFileChange} />
      {
        dataTranslate && <button onClick={generateVTTFile} className="button-18">Tải file</button>
      }
      <h2 className="flex items-center text-[30px] font-semibold m-4">Subtitles:
        <span onClick={translatePage} className="ml-2">
          {
            dataTranslate && <Reload />
          }
        </span>
      </h2>
      <Table dataSource={dataTranslate} columns={columns}
        pagination={{
          onChange: (page, pageSize) => {
            setPageSize({ page: page, size: pageSize })
          }
        }}

      />;
      <Modal
        visible={loading}
        footer={null}  // Không hiển thị footer của modal
        closable={false}  // Không có nút đóng
        centered
      >
        <div style={{ textAlign: 'center' }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
          <p>Loading...</p>
        </div>
      </Modal>
    </div>
  );
};

export default App;


