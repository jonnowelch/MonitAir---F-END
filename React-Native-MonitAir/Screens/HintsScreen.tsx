import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../Components/Header";

interface Props {
  navigation: any;
}

const HintsScreen: React.SFC<Props> = props => (
  <>
    <Header navigate={props.navigation.navigate} />
    <View style={{ alignSelf: "center", paddingBottom: 10 }}>
      <Text
        style={{
          color: "#13D0FF",
          fontSize: 18,
          fontFamily: "Quicksand-SemiBold",
          padding: 20
        }}
      >
        Tips to improve the air quality in your home!
      </Text>
    </View>
    <ScrollView>
      <View
        style={{
          flex: 1,
          alignSelf: "center",
          padding: 10,
          margin: 10,
          height: "100%",
          borderColor: "#13D0FF",
          borderWidth: 2,
          borderRadius: 8
        }}
      >
        <Text style={styles.text}>
          Air pollution can be damaging to our health; car exhaust, diesel
          engines, industrial waste and agriculture all release toxic particles
          that we ingest that then affect our health. However indoor air
          pollution can be equally damaging. Stale indoor air and heating
          systems can increase the amount of allergy-inducing dust mites, pet
          dander, and mould spores circulating through your house. In late
          winter and early spring, it may still be too chilly to throw open the
          windows to pull out the musty air, so while you await the warmer
          weather it's important to be aware of some of the allergy and
          respiratory triggers that may be lurking in your surroundings. These
          easy to follow tips will help ensure you keep the air quality in your
          home at a safe level.
        </Text>
        <Text
          style={{
            marginTop: 5,
            color: "#3B7BFF",
            fontFamily: "Quicksand-SemiBold"
          }}
        >
          1. Keep It Clean! A clean house is a healthier house. Your cleaning
          efforts should focus on strategies to reduce the accumulation of pet
          dander, mould, and dust lurking in your home. Focus on the following:
          -{"\n"}
          {"\u2022"} Vacumming the carpets with a vacuum equipped with a HEPA
          filter.
          {"\n"}
          {"\u2022"} Regularly cleaning bedding, curtains, and other
          upholstery/soft furnishings, particularly if you have pets as these
          tend to attract allergens.
          {"\n"}
          2. Invest in an air purifier. If you're allergic to indoor allergens
          and can't control the source (e.g family pet) - it may help to use an
          air purifier. These devices help capture some of the irritants that
          may trigger your symptoms. They won't completely remove the allergens
          but it can help cut them down.
          {"\n"}
          3. Monitor humidity. Ideally a humidity between 30% to 50% will help
          to prevent the build-up of mould, which grows readily in areas where
          the humidity level is too high. Buying a dehumidifier can help to
          reduce the levels of humidity in your home.
          {"\n"}
          4. Smoke and carbon monoxide detectors. Regularly test your smoke and
          carbon monoxide detectors to ensure they are working properly these
          are extremely hazardous to health!
          {"\n"}
          5. Use Eco-friendly cleaning products. Though rarely mentioned, the
          fragrance of some cleaning products is actually made up of a cocktail
          of pretty nasty chemicals. Even fragrance free products can still
          contain these chemicals! Try to source cleaning products which are
          environmentally friendly. These work in exacly the same way but
          without causing damage to your health!
          {"\n"}
          6. Monitor ventilation. Ventilation varies from building to building
          and monitoring it is essential to keeping good air-flow in a room. The
          simplest way to ventilate your home is to open windows wherever
          possible.
        </Text>
      </View>
    </ScrollView>
  </>
);

HintsScreen.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    color: "#3B7BFF",
    fontFamily: "Quicksand-SemiBold"
  }
});

export default HintsScreen;
