import { StatusIndicatorProps } from "@cloudscape-design/components";
import { SemanticSearchResult } from "../API";

//추가 by Seongeun
const getDistributionUrl = () => {
  let currentUrl: string = window.location.href;
  const regex = /^(https?:\/\/[^\/]+\.cloudfront\.net\/)/;
  const match = currentUrl.match(regex);
  if (match) {
    currentUrl = match[1];
  } else {
    console.log("CloudFront 도메인을 찾을 수 없습니다.");
  }
  if(currentUrl.includes("localhost")){
    // When testing somewhere different, Need to specify CF distribution (for example localhost, ...)
    return "https://dtpq8vyk5t5ol.cloudfront.net/";  // It must include "/" at the end
  }else{
    return currentUrl;
  }
}
//추가 by Seongeun
export const fileDistributionUrl = getDistributionUrl();
//Korean 추가 by Seongeun
export const languageList = [
  { value: "simple", label: "Simple" },
  { value: "arabic", label: "Arabic" },
  { value: "armenian", label: "Armenian" },
  { value: "basque", label: "Basque" },
  { value: "catalan", label: "Catalan" },
  { value: "danish", label: "Danish" },
  { value: "dutch", label: "Dutch" },
  { value: "english", label: "English" },
  { value: "finnish", label: "Finnish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "greek", label: "Greek" },
  { value: "hindi", label: "Hindi" },
  { value: "hungarian", label: "Hungarian" },
  { value: "indonesian", label: "Indonesian" },
  { value: "irish", label: "Irish" },
  { value: "italian", label: "Italian" },
  { value: "lithuanian", label: "Lithuanian" },
  { value: "nepali", label: "Nepali" },
  { value: "norwegian", label: "Norwegian" },
  { value: "portuguese", label: "Portuguese" },
  { value: "romanian", label: "Romanian" },
  { value: "russian", label: "Russian" },
  { value: "serbian", label: "Serbian" },
  { value: "spanish", label: "Spanish" },
  { value: "swedish", label: "Swedish" },
  { value: "korean", label: "Korean" },
];

export abstract class Labels {
  static languageMap = new Map(languageList.map((l) => [l.value, l.label]));

  static engineMap: Record<string, string> = {
    aurora: "Aurora Serverless v2 (pgvector)",
    opensearch: "OpenSearch Serverless",
    kendra: "Kendra",
    bedrock_kb: "Bedrock Knowledge Base",
  };

  static statusTypeMap: Record<string, StatusIndicatorProps.Type> = {
    unknown: "warning",
    pending: "pending",
    submitted: "pending",
    creating: "in-progress",
    ready: "success",
    created: "success",
    processing: "in-progress",
    processed: "success",
    deleting: "in-progress",
    error: "error",
    disabled: "stopped",
    enabled: "success",
  };

  static statusMap: Record<string, string> = {
    unknown: "Unknown",
    pending: "Pending",
    submitted: "Submitted",
    creating: "Creating",
    ready: "Ready",
    created: "Created",
    processing: "Processing",
    processed: "Processed",
    deleting: "Deleting",
    error: "Error",
    disabled: "Disabled",
    enabled: "Enabled",
  };

  static distanceFunctionScoreMapAurora: Record<string, string> = {
    inner: "Negative inner product",
    cosine: "Cosine distance",
    l2: "Euclidean distance / L2 norm",
  };

  static distanceFunctionScoreMapOpenSearch: Record<string, string> = {
    l2: "1 divided by 1 + L2 norm",
  };

  static sourceTypeMap: Record<string, string> = {
    vector_search: "Vector search",
    keyword_search: "Keyword search",
    kendra: "Kendra",
  };

  static documentTypeMap: Record<string, string> = {
    file: "File",
    text: "Text",
    website: "Website",
    qna: "Q&A",
    rss: "RSS Feed",
  };

  static getDistanceFunctionScoreName(result: SemanticSearchResult) {
    if (result.engine === "aurora") {
      return Labels.distanceFunctionScoreMapAurora[result.vectorSearchMetric!];
    } else if (result.engine === "opensearch") {
      return Labels.distanceFunctionScoreMapOpenSearch[
        result.vectorSearchMetric!
      ];
    }

    return null;
  }
}

export const CHATBOT_NAME = "AWS GenAI Chatbot";
