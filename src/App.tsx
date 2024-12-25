import { Table } from "antd";
import React, { useState } from "react";

const App: React.FC = () => {
  const [subtitles, setSubtitles] = useState<any>([]);

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
      for (let i = 0; i < lines.length; i += 3) {
        listConet.push({ [lines[i + 1]]: lines[i + 2] })
      }
      setSubtitles(listConet);
    };
    
    reader.onerror = () => {
      alert("Error reading file.");
    };

    reader.readAsText(file);
  };
  console.log(subtitles,'rưerwerwerwerwerwe')
  const handleCallApiTranslate = async () => {
    const totalNodeText = 20;
    const totalCallAPi =  Math.round(subtitles?.length / totalNodeText)
    for (let i = 0; i < totalCallAPi + 1; i++) {
      console.log('callAPi', subtitles.texts.slice(i * totalNodeText, (i + 1) * totalNodeText))
      subtitles.texts.slice(i * totalNodeText, (i + 1) * totalNodeText)
    }
  }
  const generateVTTFile = (newSubtitles: string[]) => {
    let vttContent = "WebVTT\n\n";

    for (let i = 0; i < newSubtitles.length; i++) {
      const timestamp = subtitles.timestamps[i]; // Giữ lại timestamp cũ
      const content = tranlate[i];

      vttContent += `${i + 1}\n${timestamp}\n${content}\n\n`;
    }
    console.log(vttContent, '=======>')
    const blob = new Blob([vttContent], { type: "text/vtt" });
    const url = URL.createObjectURL(blob);

    // Tạo một link tải file
    const link = document.createElement("a");
    link.href = url;
    link.download = "tranlatetoVi.vtt";
    link.click();

    // Thực hiện giải phóng Blob sau khi tải
    URL.revokeObjectURL(url);
  }
  handleCallApiTranslate()
  // generateVTTFile(subtitles.timestamps)

  const data = fakeData.map((item, index) => {
    const firstKey = Object.keys(item)[0];
    const timeSub = firstKey.split('-->')
    return {
      key: index,
      startTime: timeSub[0].trim(),
      endTime: timeSub[1],
      orignalText: item[firstKey as keyof typeof item],
      translatedText: item?.translation
    }
  })
  console.log(data,'fsgjhfsdghfjs')
  const columns = [
  {
    title: 'STT',
    dataIndex: 'index',
    key: 'index',
    render: (_text:any, _record:any, index:number) => index + 1, 
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
  },
  {
    title: 'Translated Text',
    dataIndex: 'translatedText',
    key: 'orignalText',
  },
];
  return (
    <div style={{ padding: "20px" }}>
      <h1>Read VTT File</h1>
      <input type="file" accept=".vtt" onChange={handleFileChange} />
      <button onClick={() =>generateVTTFile}>Tải file</button>
      <h2>Subtitles:</h2>
      <Table dataSource={data} columns={columns} />;
    </div>
  );
};

export default App;

const tranlate =
  [
    "Xin chào và chào mừng đến với IELTS cùng Lydia.",
    "Bây giờ chúng ta nói về chủ đề công việc. Vì vậy, điều này hoàn toàn phụ thuộc vào giai đoạn nào của",
    "cuộc sống bạn đang ở. Người lớn sẽ trả lời câu hỏi này theo bản chất khác với học sinh, nhưng tôi",
    "quen thuộc nhất với việc tiến hành bài kiểm tra IELTS với học sinh và tôi tin rằng một điểm chung",
    "Câu trả lời cho câu hỏi \"Bạn làm nghề gì?\" có thể là \"Hiện tại tôi là sinh viên năm nhất tại trường Đại học Hoa Sen.",
    "Chuyên ngành chính của tôi là quản lý khách sạn nhưng tôi có một công việc bán thời gian tại một cửa hàng điện thoại, tôi là một người bán hàng.\"",
    "Cái gì đó như thế. Bây giờ, tôi đồng ý là rất khó để trả lời câu hỏi này theo cách mà",
    "thể hiện đầy đủ tiếng Anh của bạn nhưng vẫn có cách giải quyết, vì vậy hãy suy nghĩ về điều này. Lời khuyên của tôi là",
    "hãy nghĩ về loại nhiệm vụ bạn thực sự đảm nhiệm khi làm việc.",
    "Bạn làm việc vào những giờ nào? Chức danh công việc chính thức của bạn là gì? Bạn làm việc ở đâu liên quan đến",
    "bạn học ở đâu? Tên công ty là gì? Và ừm, hãy nhớ rằng đó không phải là bí mật. Và bạn có",
    "thực sự thích công việc đó? Và nếu bạn có thể nghĩ về những điều đó và đưa ra câu trả lời cho",
    "với tất cả những câu hỏi tôi vừa hỏi, tôi chắc chắn bạn sẽ có thể đưa ra câu trả lời tốt hơn.",
    "Và một câu trả lời tốt hơn có thể là \"Ồ, hiện tại tôi đang bán điện thoại để kiếm sống. Vâng,",
    "Tôi là nhân viên bán hàng của FPT và tôi dành thời gian từ thứ Hai đến thứ Sáu,",
    "hỗ trợ khách hàng bằng cách khuyến khích họ cách nâng cấp dịch vụ và cách sửa chữa",
    "điện thoại nếu nó bị hỏng. Đây không phải là công việc có nhiều phần thưởng nhất trên thế giới nhưng tôi đoán là tạm ổn.\"",
    "Và điều này nghe có vẻ tự nhiên hơn một chút và sử dụng từ vựng tốt hơn nhiều. Hãy nhớ rằng,",
    "Ấn tượng đầu tiên rất quan trọng, ngay cả với giám khảo IELTS, vì họ cũng chỉ là con người.",
    "Vì vậy, nếu bạn muốn bắt đầu ngay, nghĩa là phải có một khởi đầu tốt,",
    "điều quan trọng là bạn có thể trả lời câu hỏi đầu tiên theo cách nổi bật",
    "từ phần còn lại. Và \"Bạn làm nghề gì?\" thường là câu hỏi đầu tiên. Vì vậy, nếu",
    "Nếu bạn muốn có một khởi đầu thuận lợi, hãy nghĩ về cách bạn trả lời những câu hỏi đầu tiên.",
    "Câu hỏi tiếp theo là \"Tại sao bạn lại chọn làm loại công việc đó?\" Bây giờ,",
    "một phản ứng khá mơ hồ cho điều này có thể là ứng viên chỉ bày tỏ một điều rất chính thống",
    "lý do tại sao họ chọn loại công việc đó. Vì vậy, nó có thể nghe giống như",
    "\"Tôi cần kiếm thu nhập để có thể thanh toán các hóa đơn. Tôi chọn công việc này để có thể nhận được lương, nghĩa là tôi có thể thoải mái hơn. Tôi cũng thích tìm hiểu về công nghệ mới.\"",
    "Bây giờ, thoạt nhìn, điều này có vẻ như là một phản ứng hoàn toàn có thể chấp nhận được. Nhưng,",
    "quá nhiều loại phản hồi này và nó sẽ ngăn bạn đạt được điểm cao. Phản hồi này chỉ có ba câu. Hai câu đơn và một câu ghép,",
    "vì vậy không có cấu trúc câu phức tạp. Và nó cũng có vốn từ vựng khá hạn chế, chỉ là",
    "đủ cho nhiệm vụ này. Vì vậy, để củng cố điều này hãy nghĩ về cách bạn có thể thêm nhiều hơn",
    "cấu trúc câu phức tạp, sử dụng liên từ phụ thuộc. Cái gì, ngoài tiền, là thứ đó",
    "thực sự đã dẫn bạn đến việc lựa chọn loại công việc này? Tại sao bạn thích tìm hiểu về công nghệ mới,",
    "nếu bạn định nói thế thì sao? Và ban đầu bạn đã tìm thấy cơ hội việc làm này như thế nào?",
    "Và một câu trả lời tốt hơn, phát triển hơn có thể là \"Vâng, khi tôi lần đầu hỏi về vai trò này",
    "Tôi đang rất cần một công việc vì bố mẹ tôi cứ nói rằng tôi sẽ không thể sống sót được.",
    "về mặt tài chính trừ khi tôi sắp xếp lại mọi thứ và giải quyết các ưu tiên của mình. Rất may,",
    "bạn tôi ở trường đại học đã kể cho tôi về công việc này và cuối cùng đã giúp tôi có được một cuộc phỏng vấn,",
    "và mặc dù đó không phải là công việc hấp dẫn nhất trên thế giới, như tôi đã ám chỉ trước đó,",
    "đồng nghiệp của tôi là một luồng gió mới và tôi đoán điều đó làm cho mỗi ca làm việc trở nên đáng giá.",
    "Bây giờ, ứng viên kể một chút về tình hình tài chính của mình,",
    "họ đang ở thời điểm nào để tìm kiếm công việc đó,",
    "cho phép họ sử dụng vốn từ vựng và ngữ pháp tốt hơn. Để kết thúc, họ giải thích cách",
    "công việc thực sự là một lựa chọn tốt và sử dụng ngôn ngữ thành ngữ hơn để truyền đạt ý nghĩa chính xác,",
    "và điều này lần lượt cải thiện sự lưu loát và tính mạch lạc của chúng. Vì vậy, một lần nữa, bạn có thể thấy rằng",
    "chỉ cần trình bày chi tiết và sẵn sàng nói dài dòng thì mọi thứ sẽ bắt đầu đi vào nề nếp.",
    "Câu hỏi tiếp theo của chúng tôi là \"Bạn có muốn làm công việc nào đó không?\"",
    "Với câu hỏi này, câu trả lời điển hình nhất sẽ là mô tả một vai trò và nêu lý do tại sao bạn muốn làm vai trò đó.",
    "Mặc dù nhiều ứng viên có thể thực sự nói rằng họ thích công việc hiện tại của mình.",
    "Vì vậy, nó có thể nghe giống như thế này. \"Tôi sẽ không nói rằng có một công việc khác mà tôi",
    "muốn làm vào lúc này vì tôi thích công việc của mình. Có lẽ tôi muốn",
    "làm việc trong nhà hàng vì tôi thích gặp gỡ khách hàng mới và thích nói về ẩm thực.\"",
    "Bây giờ một lần nữa, cái này ổn cho tiếng Anh giao tiếp. Nhưng toàn bộ mục đích của IELTS là",
    "bạn có thể thể hiện trình độ thành thạo của mình và đáp ứng các tiêu chí chấm điểm. Vì vậy, để",
    "Hãy tăng câu trả lời này lên một hoặc hai bậc và nghĩ xem, công việc mơ ước của bạn khi còn nhỏ hoặc khi còn là học sinh trung học là gì?",
    "Tại sao đây lại là công việc mơ ước của bạn vào thời điểm đó? Bạn muốn thực hiện những nhiệm vụ gì trong công việc đó?",
    "Và nếu nó vẫn còn phù hợp cho đến ngày nay, bạn muốn thực hiện nhiệm vụ gì ngay bây giờ?",
    "Và một câu trả lời tốt hơn, phát triển hơn có thể là \"Ồ, kể từ khi rời trường trung học,",
    "Tôi luôn cực kỳ đam mê ẩm thực. Phần lớn các cuộc trò chuyện của tôi có xu hướng xoay quanh",
    "xung quanh việc ăn uống, nên một ngày nào đó việc mở nhà hàng riêng của tôi là điều hoàn toàn hợp lý.",
    "Với bằng quản lý khách sạn, tôi thực sự tin rằng tôi sẽ thực sự phù hợp",
    "đến việc điều hành một nhà hàng sang trọng hoặc thậm chí là một quán cà phê sang trọng được thiết kế đẹp mắt.\"",
    "Và ở đây, ứng viên hiện đang mở rộng những ký ức từ thời thơ ấu của mình và liên kết chúng với",
    "ngày nay. Họ cũng đề cập đến nền giáo dục đại học của họ và gắn kết khía cạnh đó vào đó, với nó",
    "là một lựa chọn nghề nghiệp phù hợp hơn khi họ nói về bằng quản lý khách sạn. Và",
    "kết quả là họ sử dụng nguồn từ vựng tốt hơn nhiều và cuối cùng sử dụng các cấu trúc câu phức tạp hơn,",
    "nghĩa là dấu hiệu này - đây, câu trả lời này, đúng hơn - là người chiến thắng và họ sẽ nhận được điểm cao hơn.",
    "Câu hỏi tiếp theo là \"Bạn thích điều gì ở công việc của mình?\"",
    "Bây giờ với điều này, hầu hết các ứng viên sẽ có xu hướng kể ra danh sách những thứ họ thích",
    "về công việc của họ hoặc nói điều gì đó rất chung chung, vì vậy nó có thể nghe như thế này. \"Vâng, sở thích của tôi",
    "Điều quan trọng trong công việc của tôi là con người. Tôi có rất nhiều bạn bè ở nơi làm việc giúp tôi có thêm kiến ​​thức mới.",
    "Tôi cũng thích nhận lương vào cuối tháng và có thể chi tiêu số tiền đó vào những thứ tôi thích.\"",
    "Bây giờ, phản ứng của anh ấy cần được thêm gia vị để có thể thúc đẩy nó từ có lẽ",
    "từ band sáu lên band chín. Cần có vốn từ vựng tốt hơn, cấu trúc ngữ pháp tốt hơn,",
    "phát triển toàn diện hơn và bạn cần làm cho nó ít chung chung hơn. Làm cho nó trở nên độc đáo đối với bạn.",
    "Hãy nghĩ xem điều gì làm cho công việc của bạn có giá trị. Tại sao bạn ra khỏi giường vào buổi sáng?",
    "Tại sao việc đi làm lại quan trọng với bạn? Bạn thực sự quan tâm đến những điều gì?",
    "thích công việc của bạn mà người khác không thích? Cố gắng không đề cập đến tiền lương và những thứ tương tự như vậy.",
    "Và một câu trả lời tốt hơn có thể là \"Ồ, trở thành một cố vấn giáo dục, đó là một điều khá dễ dàng",
    "câu trả lời thực sự. Mặt tôi thích nhất về công việc này là tôi được giúp đỡ",
    "học sinh lớn lên và phát triển thành những cá nhân tốt hơn toàn diện. Mặc dù nghe có vẻ hơi sáo rỗng,",
    "điều này thực sự mang lại cho tôi cảm giác được đền đáp. Và tôi thấy rằng chỉ cần cười một chút",
    "và trò đùa với học sinh cũng làm cho toàn bộ trải nghiệm học tập trở nên thú vị hơn.\"",
    "Và ở đây, ứng viên thực sự suy ngẫm về thực tế rằng câu trả lời của họ có lẽ là một",
    "hơi chung chung nhưng họ đã thể hiện phong cách để làm điều đó bởi vì họ đã nói cụm từ",
    "\"mặc dù điều này nghe có vẻ rất sáo rỗng.\" Và đó là một công cụ tuyệt vời, đó là một thiết bị tốt nếu bạn từng",
    "cần phải nói điều gì đó có lẽ không quá độc đáo vì nó cho phép bạn",
    "sử dụng cấu trúc câu phức tạp, vì từ \"mặc dù\" có chứa liên từ phụ thuộc.",
    "Tóm lại, câu trả lời này rất tuyệt vời và sẽ nhận được điểm cao hơn nhiều.",
    "Tiếp theo là câu hỏi \"Bạn không thích nhất điều gì ở công việc của mình?\"",
    "Bây giờ với câu hỏi này, hầu hết các ứng viên thường sẽ liệt kê khoảng ba điều họ không thích về",
    "công việc của họ và đây sẽ là những thứ khá chuẩn mực. Một cái gì đó tương tự như",
    "\"Có một điều tôi không thích ở công việc hiện tại của mình là đôi khi phải làm việc nhiều giờ. Tôi",
    "ước gì tôi có nhiều thời gian rảnh hơn để làm những gì tôi muốn. Một điều nữa là nó có thể khá",
    "căng thẳng khi tôi phải đáp ứng thời hạn.\" Bây giờ phản ứng này không tệ nhưng nó không phải là",
    "xứng đáng được điểm tám và chắc chắn không xứng đáng được điểm chín vì nó còn thiếu sót",
    "trước từ vựng và cấu trúc câu phức tạp. Vì vậy, tôi muốn bạn suy nghĩ về",
    "những khía cạnh nào trong công việc của bạn mà bạn thực sự không thích nhất. Điều gì thực sự khiến bạn bực mình trong",
    "hàng ngày? Có điều gì bạn không thích nhưng lại độc đáo và liên quan đến bạn?",
    "Không phải là điều mà mọi người không thích nhưng cá nhân bạn không thích. Hãy nhớ rằng, không ai khác",
    "sắp nghe cuộc trò chuyện này. Bạn có thể sử dụng từ vựng nào để phản hồi tốt hơn?",
    "Và câu trả lời tốt hơn có thể nghe như sau. \"Vâng, làm việc trong ngành tài chính",
    "đôi khi việc quản lý có thể khá khó khăn vì, công bằng mà nói, đó không phải là điều quan trọng nhất",
    "thú vị của các vai diễn. Đôi khi tôi chỉ tưởng tượng mình đang uống một quả dừa trên bãi biển và tự hỏi tại sao tôi",
    "không quyết định theo đuổi sự nghiệp trong một lĩnh vực nào đó hấp dẫn hơn một chút. Tuy nhiên, ngoài điều đó ra,",
    "có thể gây căng thẳng vô cùng, đặc biệt là những phút cuối phải vội vã hoàn thành báo cáo cuối tháng,",
    "tính toán sự thành công trong tương lai của công ty. Tôi đoán ngoài điều đó ra,",
    "những mặt tích cực lớn hơn những mặt hạn chế.\" Và ở đây, ứng viên thực sự đã sử dụng",
    "một loại khung khác. Tôi đã nói về PEEL trước đó. Bây giờ họ sử dụng",
    "khuôn khổ OPEO để cấu trúc phản hồi của họ. Ừm, và OPEO là viết tắt của Ý kiến, Lý do, Giải thích",
    "và sau đó là Ý kiến. Vì vậy, nó rất giống với PEEL, bao gồm Chỉ ra, Giải thích, Làm rõ, Liên kết.",
    "Vậy chúng ta hãy cùng xem cô ấy sử dụng cấu trúc OREO đó như thế nào nhé",
    "trong phản hồi của cô ấy. Ý kiến ​​đầu tiên là \"làm việc trong lĩnh vực tài chính có thể khá khó khăn",
    "lần vì đó không phải là công việc thú vị nhất.\" Sau đó, chúng ta chuyển sang R, đó là Lý do. Vậy tại sao",
    "nó không thú vị sao? Vâng, họ đã cố gắng nói rằng \"nó có thể vô cùng căng thẳng, đặc biệt là",
    "những cuộc chạy đua vào phút chót để hoàn thành các báo cáo cuối tháng.\" Ừm, và sau đó họ đưa ra một Ví dụ,",
    "đó là nơi họ phải \"tính toán sự thành công trong tương lai của công ty\". Và sau đó họ đưa ra",
    "Ý kiến ​​cho rằng \"ngoài điều đó ra, những mặt tích cực vẫn lớn hơn những mặt hạn chế\".",
    "Vì vậy, bạn có thể thấy cấu trúc OREO được tuân thủ tốt trong suốt quá trình.",
    "Câu hỏi tiếp theo của chúng tôi là \"Bạn có nhớ thời sinh viên không?\"",
    "Bây giờ với câu hỏi này hầu hết các ứng viên sẽ có xu hướng trả lời có hoặc không và đưa ra",
    "một lý do tại sao. Ờ, vậy thì nó có thể nghe giống như sau. \"Vâng, tôi làm vậy vì tôi nhớ",
    "bạn bè của tôi. Hơn nữa, tôi cảm thấy những ngày đó gợi nhớ cho tôi về thời thơ ấu. Tuy nhiên, tôi không",
    "thực sự nhớ cảm giác không có tiền. Ừm, vì vậy, tôi đoán là mọi đồng xu đều có hai mặt.\"",
    "Bây giờ, những người liên tục đạt điểm sáu nhưng vẫn đang cố gắng để đạt điểm cao hơn",
    "có thể nghĩ rằng, Đó chính xác là những gì tôi muốn nói, có gì sai với điều đó? Vâng, vấn đề ở đây",
    "là việc sử dụng quá nhiều các thiết bị gắn kết đến mức nghe có vẻ máy móc, được tập luyện,",
    "và không tự nhiên. Ừm, vậy thì điều tôi muốn bạn nghĩ đến là bạn có thể sử dụng những thiết bị gắn kết nào thay thế",
    "của hơn nữa, do đó, và tuy nhiên. Làm thế nào bạn có thể giải thích chi tiết hơn về một số điểm bạn đã nêu ra?",
    "nó thực sự chứa nhiều từ vựng nâng cao hơn? Và có cụm từ thành ngữ nào tốt hơn mà bạn",
    "có thể sử dụng hai mặt của mỗi đồng xu không? Bởi vì, mặc dù tôi khuyến khích tất cả các ứng cử viên sử dụng",
    "ngôn ngữ thành ngữ, từ này chắc chắn bị lạm dụng, cả trong nói và viết.",
    "Vì vậy, một câu trả lời tốt hơn có thể là \"Ừ, tôi chắc chắn dành nhiều thời gian để hồi tưởng về",
    "Những ngày tháng còn là sinh viên, tôi luôn nhớ lại khoảng thời gian đó với những kỷ niệm vô cùng đẹp đẽ.",
    "Ừm, tôi có một số người bạn tuyệt vời ở đó, một số người mà tôi rất tiếc đã mất liên lạc kể từ đó",
    "tốt nghiệp. Nói như vậy, tôi không thực sự nhớ cảnh túng thiếu cũng như không nhớ cảnh sống ở một số",
    "họ sắp xếp cho chúng tôi một chỗ ở tồi tệ. Vì vậy, tôi đoán là thực sự rất bấp bênh.\"",
    "Và bây giờ bạn có thể thấy rằng ứng viên đã sử dụng vốn từ vựng nâng cao đó. Họ đã",
    "nói hồi tưởng. Đáng tiếc là họ đã kiềm chế không sử dụng các từ nối được sử dụng quá mức",
    "bởi vì họ đã nói những từ - họ đã nói những cụm từ - thay vì như \"đã nói rằng\",",
    "đó là cách tự nhiên hơn để tạo sự tương phản. Họ đã sử dụng từ \"sau khi tốt nghiệp\",",
    "áp dụng ngữ cảnh và đó là cách nói tốt hơn \"kể từ khi còn là sinh viên\". Và họ cũng đã kết thúc",
    "với \"swings and roundabouts\" như một thành ngữ kết thúc thay vì \"two sides to every coin.\" Đây là",
    "ít phổ biến hơn và nhìn chung, là một cụm từ tốt hơn nhiều để sử dụng, dù sao đi nữa. Vì vậy, chỉ cần",
    "hãy ghi nhớ điều đó. Và bây giờ, nhìn chung, ứng viên này sẽ đạt được điểm cao nhất.",
    "Bây giờ trước khi tôi tiết lộ câu trả lời tốt hơn từ một ứng viên, tôi chỉ",
    "muốn bạn tạm dừng video và tự mình thử.",
    "Hiện tại tôi là giáo viên tiếng Anh cấp 2 tại Thành phố Hồ Chí Minh,",
    "chủ yếu tập trung vào lớp mười đến lớp mười hai. Trước đây, tôi đã dạy ở",
    "các trường tiểu học và đại học, chủ yếu ở Seoul, Hàn Quốc.",
    "Vâng, tôi làm rất nhiều việc. Nhưng nếu bạn đang nói cụ thể về những gì tôi được trả",
    "để làm việc chuyên nghiệp, thì tôi là một nhà giáo dục và hiện tại tôi đang làm việc tại American International",
    "Trường học ở Sài Gòn, tôi dạy văn học và viết học thuật cho học sinh lớp tám, lớp mười và lớp mười hai.",
    "Hiện tại tôi là giáo viên ở Việt Nam,",
    "dạy tiếng Anh như ngôn ngữ thứ hai. Và tôi cũng dạy lập trình cho trẻ em bằng Scratch và Python. Và trước đó,",
    "trước khi trở thành giáo viên, tôi là nhân viên phục vụ nhà hàng và làm pha chế và pha cà phê.",
    "Tôi là một giáo viên tiếng Anh. Tôi hiện đang sống ở Úc, nơi tôi đang giảng dạy,",
    "và tôi cũng là một sinh viên. Tôi đang học thạc sĩ và tôi đang làm việc hướng tới",
    "trở thành người được chứng nhận đầy đủ. Ngoài ra, trong thời gian rảnh rỗi của tôi,",
    "Tôi dành nhiều thời gian để giao dịch tiền điện tử, đó cũng là điều tôi thực sự quan tâm.",
    "Công việc hiện tại của tôi là dạy tiếng Anh cho học sinh trung học, từ lớp mười đến lớp mười một.",
    "Rất nhiều lớp tiếng Anh của chúng tôi dựa trên việc chuẩn bị cho kỳ thi IELTS. Và vào buổi tối, một số",
    "Mỗi tuần, tôi cũng dạy tiếng Anh cho một học sinh theo hình thức lớp học trực tuyến một kèm một.",
    "Người ta có thể nói rằng tôi có rất nhiều việc phải làm. Nhưng công việc chính của tôi là giáo viên",
    "và tôi là giáo viên tiếng Anh và tiếng Pháp, điều này thực sự phù hợp với tôi vì tôi học",
    "ngôn ngữ học nên nó phù hợp với chuyên ngành của tôi. Và tôi thực sự đam mê công việc của mình.",
    "Hiện tại, tôi đang làm quản lý nhân sự và tuyển dụng.",
    "Với những điều đã nói, trọng tâm chính và công việc hàng ngày của tôi là tuyển dụng và đào tạo nhân viên mới. Tôi đã",
    "ở vị trí hiện tại này trong khoảng ba năm và đó là một quá trình học hỏi ngay từ ngày đầu tiên.",
    "Công việc này đòi hỏi tôi phải có khả năng thích nghi và có thể đưa ra giải pháp cho các vấn đề",
    "những điều xảy đến với tôi, bất kể tôi có xử lý chúng theo cách tương tự hay không.",
    "Vâng, tôi đã chọn nghề nghiệp của mình vì một số lý do. Chủ yếu là tôi yêu nghề nghiệp của mình. Tôi có",
    "thật may mắn khi được làm việc tại những ngôi trường tuyệt vời với những học sinh tuyệt vời và nhiệt tình. Một",
    "Lý do là công việc này cho phép tôi được đi khắp thế giới và làm việc ở rất nhiều địa điểm tuyệt vời.",
    "Vâng, ban đầu tôi đã có kế hoạch làm việc với các tổ chức nhân đạo hoặc phi chính phủ",
    "các tổ chức vì bằng đại học của tôi chuyên ngành nghiên cứu phát triển quốc tế.",
    "Tuy nhiên, khi tôi tốt nghiệp, tôi thấy không có nhiều cơ hội việc làm ở khu vực đó.",
    "Tôi đã nghĩ đến việc trở thành luật sư trong một thời gian ngắn và sau đó tôi có một số người bạn đã chuyển đến Nhật Bản,",
    "ừm, trong công việc giảng dạy và tôi nghĩ sẽ rất thú vị khi sống ở Châu Á. Tôi không có nhiều",
    "kinh nghiệm với điều đó, nhưng tôi quyết định sẽ thử và sau một vài năm",
    "khi làm việc trong lĩnh vực đó, tôi quyết định rằng tôi thực sự thích nó và có rất nhiều cơ hội việc làm",
    "trên toàn thế giới, vì vậy tôi quyết định sẽ tiếp tục theo đuổi con đường học vấn cao hơn.",
    "Tôi đang tìm cách làm điều gì đó khác biệt. Tôi đã",
    "đã làm việc trong ngành dịch vụ khách sạn khoảng mười năm và anh họ tôi đã là",
    "giáo viên ở Việt Nam và bảo tôi nên đến và bắt đầu làm.",
    "Tôi đã chọn trở thành giáo viên tiếng Anh vì một số lý do. Chúng tôi có một thời gian dài",
    "lịch sử gia đình của giáo viên. Mẹ, cha và chị gái tôi đều là giáo viên",
    "và tôi đã nhặt nó khi tôi còn trẻ chỉ để thử nghiệm khi tôi",
    "đang đi du lịch bụi qua Đông Nam Á. Ừm, tôi chỉ định đi trong khoảng sáu",
    "tháng hoặc một năm nhưng cuối cùng tôi đã làm điều đó trong hơn mười năm. Đó là điều mà tôi",
    "thực sự, thực sự thích và tôi nghĩ mình khá giỏi việc này, mà không có vẻ ích kỷ.",
    "Thực ra không hẳn là lý do to tát. Có thể là to tát, nhưng tôi chỉ biết những lợi ích",
    "của việc học một ngôn ngữ. Bản thân tôi đã học một vài ngôn ngữ nên tôi nghĩ nó sẽ rất tuyệt",
    "để có được một công việc mà tôi có thể ở vị trí là một giáo viên để xem điều đó như thế nào,",
    "trái ngược với việc là một sinh viên. Và cho đến nay thì khá thú vị, vì vậy mọi việc đang diễn ra tốt đẹp.",
    "Tôi đã chọn trở thành một giáo viên vì ngôn ngữ học, ngôn ngữ và thực sự là văn hóa, luôn luôn là",
    "một niềm đam mê của tôi. Đó là điều tôi yêu thích từ khi còn nhỏ và trở thành một giáo viên",
    "thực sự cho phép tôi khám phá tất cả những gì có trong ngôn ngữ và giảng dạy. Và,",
    "và tôi thực sự thích truyền đạt kiến ​​thức của mình cho các thế hệ tiếp theo.",
    "Trong suốt quá trình học tập, tôi luôn thấy mình rất hứng thú với các khóa học tâm lý học.",
    "liên quan đến kinh doanh. Trong suốt các khóa học này, tôi được khuyến nghị nên xem xét chuyên ngành về con người",
    "quản lý tài nguyên và thấy rằng nó phù hợp với sở thích của mình và tôi muốn theo đuổi nó như một nghề nghiệp.",
    "Với những điều đã nói, thực tế là tôi được làm việc trực tiếp với mọi người và giúp mang lại",
    "Việc phát huy thế mạnh của nhân viên cũng như giúp họ tối ưu hóa đạo đức nghề nghiệp là rất có giá trị.",
    "Vâng, tôi sẽ không nói rằng có một công việc khác mà tôi muốn theo đuổi vào lúc này vì tôi còn hơn thế nữa",
    "hài lòng với vai trò hiện tại của tôi. Tuy nhiên, tôi sẽ nói rằng quay lại trường học và lấy bằng thạc sĩ",
    "trong ngành khảo cổ học và trở thành nhà khảo cổ học là giấc mơ mà tôi vẫn không bao giờ quên.",
    "Vâng, tôi nghĩ rằng sau này tôi muốn quay lại làm việc",
    "trong phát triển quốc tế và làm việc với các tổ chức phi chính phủ tập trung vào phát triển giáo dục tại",
    "những vùng nông thôn ở các quốc gia đang phát triển. Nhưng điều đó sẽ mất thêm thời gian để tiếp tục",
    "trình độ học vấn của tôi để có thể ứng tuyển vào những vị trí đáp ứng được những yêu cầu đó.",
    "Hiện tại tôi thực sự thích giảng dạy. Đó là một công việc thực sự độc lập, nơi tôi có thể lựa chọn",
    "cách tôi sẽ làm bài học của mình và có một lượng giám sát hạn chế đối với tôi. Một cái gì đó",
    "điều tôi thực sự muốn làm trong tương lai là tiếp tục học tập và làm việc trong lĩnh vực này",
    "chuyên ngành chính của tôi là thiết kế ứng dụng. Thiết kế UI và UX của trang web và ứng dụng.",
    "Vâng, thành thật mà nói thì tôi thực sự thích giảng dạy, đó là một câu trả lời trung thực. Nhưng,",
    "nếu tôi phải lựa chọn điều gì khác, có lẽ tôi sẽ chọn trở thành một nhà giao dịch toàn thời gian.",
    "Nhưng nếu tôi bỏ nghề dạy học, tôi nghĩ tôi vẫn sẽ thực sự nhớ nó. Tôi chắc chắn sẽ",
    "nhớ sự tương tác của con người và khả năng giao lưu với nhiều người khác nhau",
    "và cũng tạo mối quan hệ với nhiều người khác nữa. Vì vậy, nếu tôi tình cờ rời khỏi lĩnh vực này,",
    "Tôi chắc chắn rằng tôi sẽ luôn nhớ nó. Vì vậy, tôi muốn luôn làm một số",
    "công việc bán thời gian trong tương lai, nếu tôi không làm nữa vì tôi thực sự thích nó.",
    "Vâng thực sự. Tôi thực sự muốn làm công việc lồng tiếng,",
    "giống như là một anh chàng mà bạn biết, đọc kịch bản cho một quảng cáo",
    "hoặc có thể là người lồng tiếng cho phim hoạt hình. Tôi cảm thấy rằng kỹ năng chính của tôi là nói chuyện",
    "vì vậy đó là điều tôi muốn sử dụng cho mục đích tài chính.",
    "Hoàn toàn không. Tôi đang làm chính xác những gì tôi đã định làm trong suốt cuộc đời mình khi tôi",
    "học tập, trải qua trường lớp, vào đại học và thậm chí sau khi được đào tạo.",
    "Bạn biết đấy, việc trở thành một giáo viên luôn luôn là - đã -",
    "là niềm đam mê của tôi và tôi cảm thấy hoàn toàn mãn nguyện với sự nghiệp của mình mỗi ngày.",
    "Tất nhiên rồi. Tôi là người thích thay đổi và thích được thử thách. Đừng hiểu lầm tôi,",
    "công việc của tôi rất khó khăn và đi kèm với những thách thức hàng ngày. Tuy nhiên, tôi sẽ và tôi đã",
    "luôn quan tâm đến công việc bán hàng và làm việc tự do cũng như làm việc từ xa.",
    "Là một giáo viên, theo tôi thì đó là câu trả lời rất dễ dàng. Khía cạnh yêu thích của tôi về",
    "công việc của tôi là những người mà tôi được bao quanh hàng ngày. Cho dù đó là đồng nghiệp,",
    "sinh viên, hoặc nhân viên hỗ trợ, bạn thực sự học cách",
    "xây dựng tinh thần cộng đồng tuyệt vời để học hỏi và cùng nhau phát triển.",
    "Cái mà tôi",
    "giống như hầu hết công việc của tôi là sự tương tác với học sinh, đặc biệt là với",
    "học sinh trung học. Tôi thấy rằng họ rất sáng tạo,",
    "chúng thú vị, chúng mang tính sáng tạo, chúng đại diện cho một tư duy khác biệt,",
    "là người thuộc thế hệ trẻ hơn tôi. Và tôi muốn nói rằng tôi đã phát triển một số",
    "mối quan hệ có ý nghĩa và gần gũi với học sinh khiến công việc của tôi có vẻ đáng giá.",
    "Điều tôi thực sự thích ở công việc của mình là sự độc lập.",
    "Trong tất cả các công việc trước đây của tôi, tôi đều có những người quản lý luôn túc trực bên cạnh tôi cả ngày, mỗi ngày,",
    "và trong việc giảng dạy, tôi được quyết định rất nhiều điều xảy ra trong ngày làm việc của mình. Rõ ràng là,",
    "có những điều tôi cần phải đạt được, nhưng tôi phải quyết định cách tôi sẽ làm",
    "và đó là điều tôi rất thích ở công việc hiện tại của mình.",
    "Có nhiều điều tôi thích về công việc của mình. Nhìn chung, tôi nghĩ giảng dạy là một công việc rất bổ ích.",
    "Thật tuyệt khi thấy học sinh của mình thành công, đặc biệt là những học sinh đang thực sự gặp khó khăn.",
    "Chúng tôi có thể giúp họ trong suốt một năm học. Ừm, ngoài ra việc giảng dạy còn cho tôi cơ hội",
    "sáng tạo. Sáng tạo trong kế hoạch bài học, powerpoint, sáng tạo trong suy nghĩ,",
    "và đưa ra những cách khác nhau để giảng dạy các môn học cụ thể, đặc biệt là",
    "một cái gì đó có thể khá nhàm chán. Ừm, để sáng tạo và cố gắng làm cho nó thú vị hơn",
    "đối với sinh viên là, là một điều tuyệt vời có thể làm được. Giảng dạy cho phép tôi sử dụng một số",
    "của các kỹ năng khác nhau. Nhưng nếu tôi phải chọn một điều mà tôi thực sự yêu thích về việc giảng dạy,",
    "tôi sẽ được nghỉ phép ba đến bốn tháng trong một năm. Thật tuyệt vời.",
    "Điều tôi thích ở công việc của mình là nó cho phép tôi, bạn biết đấy,",
    "trở thành hình mẫu cho học sinh và có thể tương tác với các em.",
    "Tôi vẫn còn trẻ nên tôi không quá xa lạ với học sinh trung học của mình,",
    "Vì vậy, tôi nghĩ một điều tôi thực sự thích là cho họ góc nhìn của một người",
    "là người lớn nhưng chưa đến mức mà tôi không thể hiểu được họ.",
    "Trước hết, tôi muốn nói rằng phần bổ ích nhất trong công việc của tôi là có thể truyền đạt một số",
    "về kiến ​​thức mà tôi đã có thể thu thập được trong suốt nhiều năm qua.",
    "Bạn thích điều gì về công việc của mình? Công việc hàng ngày của tôi tập trung vào việc tìm nguồn, sàng lọc, phỏng vấn,",
    "và cung cấp vị trí cho các ứng viên dựa trên các vị trí có sẵn. Tôi phải nói rằng",
    "Tôi thực sự thích làm việc trực tiếp với mọi người và giúp họ đảm bảo một công việc mà họ đã làm",
    "khó để có được. Có một sự thỏa mãn lớn khi cung cấp một công việc cho một ứng viên có",
    "những điểm mạnh mà công ty cần cũng như những điểm mạnh mà nhân viên muốn sử dụng.",
    "Hai năm trước, câu trả lời của tôi cho câu hỏi này có thể rất khác so với bây giờ.",
    "Tuy nhiên, do tình hình thế giới hiện tại, tôi có thể nói rằng điều tôi không thích nhất là",
    "học trực tuyến. Thật khó khăn để giữ cho học sinh có động lực và tập trung trong",
    "bài học và môi trường không hề giống với việc học trực tiếp.",
    "Điều tôi không thích nhất trong công việc của mình là công việc giấy tờ và văn thư;",
    "nhiệm vụ hành chính. Có rất nhiều trong số chúng bao gồm chấm điểm, báo cáo, đưa ra nhận xét,",
    "vân vân, và tôi không thấy việc ngồi trước máy tính làm việc với Microsoft Word hay",
    "Excel đặc biệt, uh, xác thực hoặc hấp dẫn. Vì vậy, tôi sẽ nói rằng cao",
    "Lượng giấy tờ mà trường học yêu cầu là điều tôi không thích nhất.",
    "Những điều tôi không thích về công việc hiện tại của mình là một giáo viên. Đôi khi tôi không phải là một",
    "Tôi rất thích dậy sớm nên việc làm việc vào cuối tuần luôn là một thử thách đối với tôi.",
    "Và tôi không thích nhiều sự mất tổ chức xảy ra ở những nơi tôi từng làm việc,",
    "nơi mọi thứ không được sắp xếp và mọi thứ luôn diễn ra vào phút chót và vội vã.",
    "Thành thật mà nói, không có nhiều điều tôi thực sự không thích ở công việc của mình.",
    "Nhưng tôi đoán là việc chấm điểm và thi cử vào cuối học kỳ khá nhàm chán.",
    "Tôi thích được ở trong lớp học để giảng dạy trực tiếp với giáo viên của tôi hơn nhiều.",
    "sinh viên. Tôi không thích bị kẹt trong văn phòng, phải giải quyết giấy tờ hoặc,",
    "ừm, đối phó với kỳ thi. Tôi thích được thực hành, giảng dạy, vui vẻ trong lớp học.",
    "Không có nhiều điều tôi không thích về nghề giảng dạy.",
    "Tình hình hiện tại tôi không thích, với các lớp học trực tuyến, bởi vì bạn thực sự mất rất nhiều",
    "tương tác trong các lớp học và bạn thực sự bị hạn chế về những cách bạn có thể tham gia",
    "với các sinh viên. Vì vậy, sự không thích hiện tại của tôi không liên quan gì đến công việc,",
    "đó chỉ là cách tôi phải thực hiện công việc vào lúc này.",
    "Một điều mà tôi có thể nói rằng... Tôi không, không chắc rằng tôi sẽ đi xa đến mức đó",
    "nói rằng tôi không thích nó, nhưng có vẻ như - cảm thấy - nó hơi bất tiện",
    "đôi khi. Và đó là sự thật rằng tôi phải thức dậy rất sớm vào buổi sáng.",
    "Năm giờ ba mươi đến khá sớm, vì vậy, bạn biết đấy, nếu tôi muốn có một bữa tối muộn",
    "bữa tối hoặc thứ gì đó vào đêm hôm trước, điều này có thể gây ra một chút bất tiện. Vì vậy...",
    "Nói rằng công việc quản lý nguồn nhân lực có thể gây căng thẳng là còn nói nhẹ.",
    "Tuy nhiên, giống như mọi công việc khác, nó sẽ có lúc thăng lúc trầm và chúng ta cần có khả năng",
    "tôn trọng cái thấp để xứng đáng với cái cao. Một điều mà tôi không thích là cần",
    "đứng vững ở vị trí không thiên vị giữa cả nhân viên và công ty. Điều này có nghĩa là tôi",
    "nhận được nhiều sự phản kháng từ cả hai phía. Một lần nữa, đây là một phần của công việc và là điều dễ hiểu. Được thôi.",
    "Đôi khi, tôi sẽ nói rằng tôi cho rằng tôi nhớ thời sinh viên. Nhìn lại thời sinh viên của mình,",
    "những kỳ thi mà tôi luôn lo lắng dường như bớt căng thẳng hơn nhiều bây giờ. Ngoài ra, tôi lớn lên với cha mẹ",
    "khuyến khích phát triển xã hội cùng với học thuật, do đó căng thẳng không bao giờ quá lớn.",
    "Vâng, tôi nhớ thời sinh viên quá. Tôi nghĩ rằng việc trở thành sinh viên đại học, hoặc thậm chí là một học sinh trung học",
    "học sinh, khi tôi còn trẻ có lẽ là một trong những năm tháng đẹp nhất trong cuộc đời tôi bởi vì bạn chỉ",
    "đạt được - bạn chỉ cần - tập trung vào việc học và nghiên cứu. Bạn không cần phải làm việc, bạn không cần",
    "có những trách nhiệm khác mà, bạn biết đấy, người lớn hoặc những người đi làm chuyên nghiệp thường có,",
    "và nếu có cơ hội tôi rất muốn quay lại trường và tiếp tục học lên cao hơn.",
    "Tôi nghĩ rằng bạn là một sinh viên trong suốt cuộc đời của bạn và nếu bạn nghĩ",
    "nếu không bạn sẽ gặp rất nhiều vấn đề. Vì vậy, tôi luôn tìm cách",
    "để học trong cuộc sống cá nhân của tôi. Nhưng, đối với việc là một sinh viên tại trường đại học,",
    "Tôi không hề nhớ điều đó chút nào vì tôi thấy đó là một hình thức học tập rất căng thẳng và không hiệu quả.",
    "Không hẳn vậy. Thành thật mà nói, theo một cách nào đó, tôi vẫn còn là một sinh viên.",
    "Tôi đã, tôi luôn học. Tôi nghĩ điều quan trọng là mọi người luôn giữ",
    "cố gắng thử thách bản thân và tiếp tục học tập càng nhiều càng tốt.",
    "Tôi nghĩ đặc biệt là với tư cách là một giáo viên, điều quan trọng là tôi luôn phải học hỏi và",
    "xây dựng trên các kỹ năng khác nhau nữa. Nhưng tôi đoán là tôi hiện đang ở giai đoạn ba mươi lăm",
    "năm tuổi và đã từng học ở ba hoặc bốn trường đại học khác nhau. Sau khi tôi hoàn thành,",
    "Việc học hiện tại của tôi, tôi khá chắc là mình sẽ vượt qua được và tôi không muốn phải học lại nữa.",
    "Vâng, tôi, thực ra tôi vẫn còn là sinh viên. Tôi làm việc - hoặc không làm việc với,",
    "nhưng tôi học - với một giáo viên trực tuyến để học tiếng Nhật. Vì vậy, tôi vẫn là một sinh viên,",
    "bạn biết đấy, một lần nữa, đó không phải là tình huống đăng nhập vào lớp học hay đến lớp học. Vì vậy, tôi",
    "Tôi đoán là tôi không nhớ nó vì tôi vẫn còn là sinh viên nhưng tôi không nhớ việc ở trong",
    "môi trường lớp học, nếu đó là loại câu trả lời bạn đang tìm kiếm.",
    "Tôi thực sự hiện đang là sinh viên. Tôi luôn cố gắng mở rộng kiến ​​thức của mình,",
    "mở rộng tầm nhìn của tôi về mặt ngôn ngữ học. Tôi luôn cố gắng cải thiện bản thân,",
    "dù là tự học hay học nhóm hay học trực tuyến. Vậy nên tôi thực sự vẫn là một sinh viên.",
    "Tất nhiên là tôi nhớ cuộc sống sinh viên. Đây là thời gian tràn ngập nhiều trải nghiệm học tập",
    "và nếu không có nó tôi sẽ không ở đây ngày hôm nay. Tuy nhiên, việc là một sinh viên đã đưa tôi vào một",
    "vùng thoải mái nơi tôi được an toàn và có giáo viên và cấp dưới giúp hướng dẫn tôi, không giống như ở trong",
    "môi trường làm việc chuyên nghiệp, nơi chúng ta phần lớn được kỳ vọng có khả năng tự giải quyết vấn đề.",
    "Giống như mọi thứ khác trong cuộc sống, luôn có thời điểm và địa điểm để tiến lên và tiến về phía trước.",
    "Và đó là tất cả những gì tôi muốn nói, cảm ơn bạn rất nhiều. Trước khi tôi đi,",
    "chỉ là lời nhắc nhở rằng cùng với video hướng dẫn này bạn sẽ xem",
    "câu trả lời mẫu từ những người dự thi IELTS trên toàn thế giới, vì vậy hãy tham khảo nhé.",
    "Vậy nên tôi sẽ gặp lại các bạn vào lần tới với nhiều mẹo hữu ích và chủ đề thú vị hơn. Tạm biệt nhé."
  ]
  

const fakeData = [
    {
        "00:06:34.020 --> 00:06:39.420": "With a degree in hospitality management, I do actually believe I'd be genuinely well-suited",
        "translation": "Với một bằng cấp về quản lý khách sạn, tôi thực sự tin rằng mình sẽ phù hợp rất tốt"
    },
    {
        "00:06:39.420 --> 00:06:44.940": "to running a luxury dining establishment or even perhaps a well-designed chic cafe.\"",
        "translation": "để điều hành một cơ sở ăn uống sang trọng hoặc thậm chí có thể là một quán cafe thiết kế đẹp và sành điệu."
    },
    {
        "00:06:46.140 --> 00:06:52.800": "And here, the candidate now expands on memories from their childhood and links that to the",
        "translation": "Và ở đây, ứng viên mở rộng về những kỷ niệm thời thơ ấu và liên kết chúng với"
    },
    {
        "00:06:52.800 --> 00:06:59.880": "present day. They also mentioned their university education and tie that aspect into it, with it",
        "translation": "thời điểm hiện tại. Họ cũng đề cập đến nền tảng giáo dục đại học và kết nối yếu tố đó vào, với"
    },
    {
        "00:06:59.880 --> 00:07:05.040": "being a more appropriate career choice when they talk about that hospitality management degree. And",
        "translation": "việc này là một sự lựa chọn nghề nghiệp phù hợp hơn khi họ nói về bằng cấp quản lý khách sạn đó. Và"
    },
    {
        "00:07:05.040 --> 00:07:10.380": "as a result they use much better lexical resource and end up using more complex sentence structures,",
        "translation": "do đó họ sử dụng tài nguyên từ vựng tốt hơn rất nhiều và kết thúc bằng việc sử dụng các cấu trúc câu phức tạp hơn,"
    },
    {
        "00:07:10.380 --> 00:07:18.420": "meaning this mark is - this, this response, rather - is a winner and they get a higher mark.",
        "translation": "có nghĩa là điểm số này - câu trả lời này, thay vì thế - là một câu trả lời chiến thắng và họ nhận được điểm số cao hơn."
    },
    {
        "00:07:21.480 --> 00:07:24.240": "The next question is \"What do you like about your job?\"",
        "translation": "Câu hỏi tiếp theo là \"Bạn thích gì về công việc của mình?\""
    },
    {
        "00:07:24.240 --> 00:07:30.180": "Now with this one most candidates would have a tendency to reel off the list of things they like",
        "translation": "Với câu hỏi này, hầu hết ứng viên sẽ có xu hướng liệt kê một loạt những điều họ thích"
    },
    {
        "00:07:30.180 --> 00:07:37.380": "about their job or say something very generic, so it might sound like this. \"Well, my favourite",
        "translation": "về công việc của họ hoặc nói điều gì đó rất chung chung, vì vậy có thể nghe như thế này. \"Chà, điều tôi yêu thích nhất"
    },
    {
        "00:07:37.380 --> 00:07:43.680": "thing about my job is the people. I have a lot of friends at work who help me gain new knowledge.",
        "translation": "về công việc của tôi là những người đồng nghiệp. Tôi có rất nhiều bạn bè tại nơi làm việc giúp tôi tiếp thu kiến thức mới."
    },
    {
        "00:07:43.680 --> 00:07:48.660": "I also like receiving the salary at the end of the month and then I can spend it on things I like.\"",
        "translation": "Tôi cũng thích nhận lương vào cuối tháng và sau đó tôi có thể chi tiêu vào những thứ tôi thích."
    },
    {
        "00:07:49.320 --> 00:07:55.680": "Now, his response does need spicing up in order to push it from perhaps",
        "translation": "Giờ đây, câu trả lời của anh ấy cần được làm mới để có thể nâng cấp nó từ một câu trả lời có thể là"
    },
    {
        "00:07:55.680 --> 00:08:01.260": "a band six to a band nine. It needs better vocabulary, better grammatical structures,",
        "translation": "mức độ band sáu lên band chín. Nó cần từ vựng tốt hơn, cấu trúc ngữ pháp tốt hơn,"
    },
    {
        "00:08:01.260 --> 00:08:07.800": "more all-round development, and you need to make it far less generic. Make it unique to you.",
        "translation": "phát triển toàn diện hơn, và bạn cần làm cho nó ít chung chung hơn. Hãy làm cho nó trở nên đặc biệt với bạn."
    },
    {
        "00:08:07.800 --> 00:08:13.140": "Think about what makes your job worthwhile. Why do you get out of bed in the morning?",
        "translation": "Hãy suy nghĩ về những điều làm cho công việc của bạn đáng giá. Tại sao bạn lại dậy khỏi giường vào mỗi buổi sáng?"
    },
    {
        "00:08:13.680 --> 00:08:19.380": "Why is it important to you that you go to work? What things do you actually",
        "translation": "Tại sao công việc lại quan trọng đối với bạn? Những điều gì bạn thực sự"
    },
    {
        "00:08:19.380 --> 00:08:24.780": "like about your job that others don't? Try not to mention salary and things like that.",
        "translation": "thích về công việc của bạn mà người khác không thích? Cố gắng đừng đề cập đến lương thưởng và những thứ tương tự."
    },
    {
        "00:08:26.400 --> 00:08:34.320": "And a better response may be \"Well, being an educational consultant, that's quite an easy",
        "translation": "Một câu trả lời tốt hơn có thể là \"Chà, là một tư vấn viên giáo dục, đó thực sự là một công việc dễ dàng"
    },
    {
        "00:08:34.320 --> 00:08:38.160": "answer actually. My favourite aspect about this job is that I get to help",
        "translation": "trả lời thực sự. Khía cạnh yêu thích nhất về công việc này là tôi có thể giúp đỡ"
    }
]
