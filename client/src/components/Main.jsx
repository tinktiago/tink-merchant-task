import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { AuthorizationLink } from "./AuthorizationLink";
import { BasicDropdown } from "./BasicDropdown";

export const Main = () => {
  const [market, setMarket] = useState("");
  const [testProviders, setTestProviders] = useState("");

  useEffect(() => {
    setMarket("SE");
  }, [testProviders]);

  return (
    <div>
        <Header text="Hejsan!" emoji="waving-hand" />

        <p className="text-secondary text-justify pt-2">
          We're to help and let you know your favourite merchant in 2020 and how much you've spent on it. Plus other things.
        </p>

        <p className="text-secondary text-justify">
          If you want to try the app with a real account select the market and click <em className="text-dark">Connect Bank</em>.
        </p>

        <p className="text-secondary text-justify">
          If you just want to see what this app is capable of, select <em className="text-dark">Test</em> under providers. We've selected a test provider for you. For that reason, the only available market to test is Sweden.
        </p>
      
        <div className="pt-4 pb-2">
          <BasicDropdown
            name={`Market: ${market}`}
            items={testProviders === "Real" ? [
              "SE",
              "AT",
              "BE",
              "DE", 
              "DK",
              "ES",
              "FI",
              "GB",
              "IT",
              "NL",
              "NO",
              "PT",
            ] : [
              "SE"
            ]}
            onSelect={setMarket}
            style={{ marginBottom: "30px" }}
          />
        </div>

        <div className="pt-2 pb-4">
          <BasicDropdown
            name={`Providers: ${testProviders}`}
            items={[
              "Real",
              "Test"
            ]}
            onSelect={setTestProviders}
            style={{ marginBottom: "30px" }}
          />
        </div>

        <AuthorizationLink
          scope="accounts:read,transactions:read,investments:read,user:read"
          market={market}
          testProviders={testProviders}
        />
    </div>
  );
};

export default Main;
