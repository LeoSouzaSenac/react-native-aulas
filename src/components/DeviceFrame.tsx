interface DeviceFrameProps {
  children: React.ReactNode;
  caption?: string;
}

export default function DeviceFrame({ children, caption }: DeviceFrameProps) {
  return (
    <div>
      <div className="device-frame">
        <div className="notch">
          <div className="pill" />
        </div>
        <div className="device-screen">{children}</div>
        <div className="homebar">
          <div className="bar" />
        </div>
      </div>
      {caption && <div className="device-caption">{caption}</div>}
    </div>
  );
}
